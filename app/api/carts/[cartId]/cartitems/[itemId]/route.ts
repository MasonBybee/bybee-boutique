import db from "@/db/db";
import { cartItems } from "@/schema/CartItems";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId: number;
  quantity: number;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.id, params.itemId));

  return NextResponse.json(response);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(cartItems)
    .set({ cartId: params.cartId, ...data })
    .where(eq(cartItems.id, params.itemId));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(cartItems)
    .where(eq(cartItems.id, params.itemId))
    .returning({ deletedId: cartItems.id });

  return NextResponse.json(response);
}
