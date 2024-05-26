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
    .where(eq(orderItems.id, params.id));

  return NextResponse.json(response[0]);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;

  const data: data = await request.json();

  const response = await db
    .update(orderItems)
    .set({ orderId: params.id, ...data })
    .where(eq(orderItems.id, params.id));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(orderItems)
    .where(eq(orderItems.id, params.id))
    .returning({ deletedId: orderItems.id });

  return NextResponse.json(response);
}
