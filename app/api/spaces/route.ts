import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const spaces = await prisma.space.findMany({
      where: {
        is_archived: false,
        ...(featured === "true" ? { is_featured: true } : {}),
      },
      orderBy: { member_count: "desc" },
    });

    return NextResponse.json({ spaces });
  } catch (error) {
    console.error("Get spaces error:", error);
    return NextResponse.json({ error: "Failed to fetch spaces." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    const { spaceSlug } = await req.json();
    const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
    if (!space) return NextResponse.json({ error: "Space not found." }, { status: 404 });

    const userId = (session.user as any).id;

    const existing = await prisma.spaceMember.findUnique({
      where: { space_id_user_id: { space_id: space.id, user_id: userId } },
    });

    if (existing) {
      await prisma.spaceMember.delete({
        where: { space_id_user_id: { space_id: space.id, user_id: userId } },
      });
      await prisma.space.update({
        where: { id: space.id },
        data: { member_count: { decrement: 1 } },
      });
      return NextResponse.json({ joined: false });
    }

    await prisma.spaceMember.create({
      data: { space_id: space.id, user_id: userId, role: "member" },
    });
    await prisma.space.update({
      where: { id: space.id },
      data: { member_count: { increment: 1 } },
    });

    return NextResponse.json({ joined: true });
  } catch (error) {
    console.error("Join space error:", error);
    return NextResponse.json({ error: "Failed to join space." }, { status: 500 });
  }
}