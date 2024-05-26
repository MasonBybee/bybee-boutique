import db from "@/db/db";
import { cartItems } from "@/schema/CartItems";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId: number;
  quantity: number;
}

export async function GET(request: Request, context: any) {
  const response = await db.select().from(cartItems);

  return NextResponse.json(response);
}

export async function POST(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .insert(cartItems)
    .values({ cartId: params.cartId, ...data })
    .returning();

  return NextResponse.json(response[0]);
}
