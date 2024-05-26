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
  const { params } = context;
  const response = await db
    .select()
    .from(carts)
    .where(eq(carts.id, params.cartId));

  return NextResponse.json(response[0]);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(carts)
    .set(data)
    .where(eq(carts.id, params.cartId));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(carts)
    .where(eq(carts.id, params.cartId))
    .returning({ deletedId: carts.id });

  return NextResponse.json(response);
}
