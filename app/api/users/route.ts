import { NextResponse } from "next/server";
import db from "@/db/db";
import { users } from "@/schema/User";

export async function GET() {
  const dbUsers = await db.select().from(users);

  return NextResponse.json({ users: dbUsers });
}
