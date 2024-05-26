import db from "@/db/db";
import { carts } from "@/schema/Cart";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export async function GET(request: Request, context: any) {
  const response = await db.select().from(carts);

  return NextResponse.json(response);
}

export async function POST(request: Request, context: any) {
  const data: data = await request.json();
  const response = await db.insert(carts).values(data).returning();

  return NextResponse.json(response[0]);
}
