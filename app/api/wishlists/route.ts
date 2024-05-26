import db from "@/db/db";
import { wishlists } from "@/schema/Wishlist";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  userId: number;
}

export async function GET(request: Request, context: any) {
  const response = await db.select().from(wishlists);

  return NextResponse.json(response);
}

export async function POST(request: Request, context: any) {
  const data: data = await request.json();
  const response = await db.insert(wishlists).values(data).returning();

  return NextResponse.json(response[0]);
}
