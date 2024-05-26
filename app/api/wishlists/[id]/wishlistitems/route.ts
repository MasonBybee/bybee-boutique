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
    .where(eq(wishlistItems.wishlistId, params.id));

  return NextResponse.json(response);
}

export async function POST(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .insert(wishlistItems)
    .values({ wishlistId: params.id, ...data })
    .returning();

  return NextResponse.json(response[0]);
}
