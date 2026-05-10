import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth";
import { prisma } from "@/lib/prisma";

// GET — fetch posts (paginated)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spaceSlug = searchParams.get("space");
    const sort = searchParams.get("sort") || "hot"; // hot | new | top
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    // Get space ID if filtering by space
    let spaceId: string | undefined;
    if (spaceSlug) {
      const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
      if (!space) return NextResponse.json({ error: "Space not found." }, { status: 404 });
      spaceId = space.id;
    }

    // Sort order
    const orderBy =
      sort === "new" ? { createdAt: "desc" as const } :
      sort === "top" ? { likeCount: "desc" as const } :
      { score: "desc" as const }; // hot

    const posts = await prisma.post.findMany({
      where: {
        ...(spaceId ? { spaceId } : {}),
        isRemoved: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            role: true,
          },
        },
        space: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.post.count({
      where: { ...(spaceId ? { spaceId } : {}), isRemoved: false },
    });

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

// POST — create a new post
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in to post." }, { status: 401 });
    }

    const { title, body, spaceSlug, type, isPremium } = await req.json();

    if (!title || title.trim().length < 5) {
      return NextResponse.json({ error: "Title must be at least 5 characters." }, { status: 400 });
    }

    if (!spaceSlug) {
      return NextResponse.json({ error: "Please select a space." }, { status: 400 });
    }

    // Get space
    const space = await prisma.space.findUnique({ where: { slug: spaceSlug } });
    if (!space) {
      return NextResponse.json({ error: "Space not found." }, { status: 404 });
    }

    // Check premium gate
    if (isPremium) {
      const user = await prisma.user.findUnique({
        where: { id: (session.user as any).id },
      });
      if (user?.role !== "premium" && user?.role !== "admin") {
        return NextResponse.json({ error: "Only premium members can create premium posts." }, { status: 403 });
      }
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        body: body?.trim() || null,
        spaceId: space.id,
        userId: (session.user as any).id,
        type: type || "text",
        isPremium: isPremium || false,
        score: Date.now() / 1000, // initial score
      },
      include: {
        user: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
        space: {
          select: { id: true, slug: true, name: true },
        },
      },
    });

    // Update space post count
    await prisma.space.update({
      where: { id: space.id },
      data: { postCount: { increment: 1 } },
    });

    // Update user post count
    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { postCount: { increment: 1 }, karma: { increment: 5 } },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}