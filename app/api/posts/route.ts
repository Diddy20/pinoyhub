import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spaceSlug = searchParams.get("space");
    const sort = searchParams.get("sort") || "hot";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    let space_id: string | undefined;
    if (spaceSlug) {
      const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
      if (!space) return NextResponse.json({ error: "Space not found." }, { status: 404 });
      space_id = space.id;
    }

    const orderBy =
      sort === "new" ? { created_at: "desc" as const } :
      sort === "top" ? { like_count: "desc" as const } :
      { score: "desc" as const };

    const posts = await prisma.post.findMany({
      where: {
        ...(space_id ? { space_id } : {}),
        is_removed: false,
      },
      include: {
        users_posts_user_idTousers: {
          select: { id: true, username: true, display_name: true, avatar_url: true, role: true },
        },
        spaces: {
          select: { id: true, slug: true, name: true },
        },
      },
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.post.count({
      where: { ...(space_id ? { space_id } : {}), is_removed: false },
    });

    return NextResponse.json({ posts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in to post." }, { status: 401 });
    }

    const { title, body, spaceSlug, type } = await req.json();

    if (!title || title.trim().length < 5) {
      return NextResponse.json({ error: "Title must be at least 5 characters." }, { status: 400 });
    }

    const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
    if (!space) return NextResponse.json({ error: "Space not found." }, { status: 404 });

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        body: body?.trim() || null,
        space_id: space.id,
        user_id: (session.user as any).id,
        type: type || "text",
        score: Date.now() / 1000,
      },
    });

    await prisma.space.update({
      where: { id: space.id },
      data: { post_count: { increment: 1 } },
    });

    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { post_count: { increment: 1 }, karma: { increment: 5 } },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}