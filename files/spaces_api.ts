import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET — fetch all spaces
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const spaces = await prisma.space.findMany({
      where: {
        isArchived: false,
        ...(featured === "true" ? { isFeatured: true } : {}),
      },
      orderBy: { memberCount: "desc" },
    });

    return NextResponse.json({ spaces });
  } catch (error) {
    console.error("Get spaces error:", error);
    return NextResponse.json({ error: "Failed to fetch spaces." }, { status: 500 });
  }
}

// POST — join a space
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
    }

    const { spaceSlug } = await req.json();

    const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
    if (!space) {
      return NextResponse.json({ error: "Space not found." }, { status: 404 });
    }

    const userId = (session.user as any).id;

    // Check if already a member
    const existing = await prisma.spaceMember.findUnique({
      where: { spaceId_userId: { spaceId: space.id, userId } },
    });

    if (existing) {
      // Leave space
      await prisma.spaceMember.delete({
        where: { spaceId_userId: { spaceId: space.id, userId } },
      });
      await prisma.space.update({
        where: { id: space.id },
        data: { memberCount: { decrement: 1 } },
      });
      return NextResponse.json({ joined: false });
    }

    // Join space
    await prisma.spaceMember.create({
      data: { spaceId: space.id, userId, role: "member" },
    });
    await prisma.space.update({
      where: { id: space.id },
      data: { memberCount: { increment: 1 } },
    });

    return NextResponse.json({ joined: true });
  } catch (error) {
    console.error("Join space error:", error);
    return NextResponse.json({ error: "Failed to join space." }, { status: 500 });
  }
}
