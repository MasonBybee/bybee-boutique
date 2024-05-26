import db from "@/db/db";
import { orders } from "@/schema/Order";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  userId?: number;
  subtotal?: string;
  discount?: string;
  tax?: string;
  status?: string;
  date?: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(orders)
    .where(eq(orders.id, params.id));

  return NextResponse.json(response[0]);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;

  const data: data = await request.json();

  const response = await db
    .update(orders)
    .set(data)
    .where(eq(orders.id, params.id));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(orders)
    .where(eq(orders.id, params.id))
    .returning({ deletedId: orders.id });

  return NextResponse.json(response);
}
