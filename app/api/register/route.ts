import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { displayName, username, email, password } = await req.json();

    if (!displayName || !username || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    if (username.length < 3 || username.length > 30) {
      return NextResponse.json({ error: "Username must be 3–30 characters." }, { status: 400 });
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      return NextResponse.json({ error: "Username can only contain letters, numbers, and underscores." }, { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return NextResponse.json({ error: "Username is already taken." }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        display_name: displayName,
        username,
        email,
        password_hash,
        provider: "email",
        role: "free",
        email_verified: false,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        display_name: user.display_name,
        role: user.role,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}