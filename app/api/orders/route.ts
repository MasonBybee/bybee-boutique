import db from "@/db/db";
import { orders } from "@/schema/Order";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  userId: number;
  subtotal: string;
  discount: string;
  tax: string;
  status: string;
  orderDate: string;
}

export async function GET() {
  const response = await db.select().from(orders);

  return NextResponse.json(response[0]);
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const response = await db.insert(orders).values(data).returning();

  return NextResponse.json(response[0]);
}
