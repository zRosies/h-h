import { NextResponse } from "next/server";
import { initClientDB } from "../mongo/connection";
import bcrypt from "bcryptjs";

import User from "../schemas/user";

export async function POST(request: any) {
  const { email, password } = await request.json();

  const db = await initClientDB();
  const existingUser = await db.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email is already in use", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    email,
    password: hashedPassword,
    id: crypto.randomUUID(),
  });

  try {
    await db.insertOne(newUser);
    return new NextResponse(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
