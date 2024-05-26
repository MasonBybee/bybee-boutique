import db from "@/db/db";
import { orderItems } from "@/schema/OrderItems";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId: number;
  price: string;
  quantity: number;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, params.id));

  return NextResponse.json(response[0]);
}

export async function POST(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .insert(orderItems)
    .values({ orderId: params.id, ...data })
    .returning();

  return NextResponse.json(response[0]);
}
