import db from "@/db/db";
import { wishlistItems } from "@/schema/WishlistItems";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId: number;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(wishlistItems)
    .where(eq(wishlistItems.id, params.itemId));
  return NextResponse.json(response);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(wishlistItems)
    .set({ wishlistId: params.id, ...data })
    .where(eq(wishlistItems.id, params.itemId));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(wishlistItems)
    .where(eq(wishlistItems.id, params.itemId))
    .returning({ deletedId: wishlistItems.id });

  return NextResponse.json(response);
}
