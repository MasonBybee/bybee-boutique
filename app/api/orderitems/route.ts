import db from "@/db/db";
import { orderItems } from "@/schema/OrderItems";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  orderId: number;
  inventoryId: number;
  price: string;
  quantity: number;
}

export async function GET() {
  const response = await db.select().from(orderItems);

  return NextResponse.json(response[0]);
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const response = await db.insert(orderItems).values(data).returning();

  return NextResponse.json(response[0]);
}
