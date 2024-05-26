import db from "@/db/db";
import { wishlists } from "@/schema/Wishlist";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  userId: number;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db.query.wishlists.findFirst({
    where: (wishlists, { eq }) => eq(wishlists.id, params.id),
    with: {
      items: true,
    },
  });

  return NextResponse.json(response);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(wishlists)
    .set(data)
    .where(eq(wishlists.id, params.id));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(wishlists)
    .where(eq(wishlists.id, params.id))
    .returning({ deletedId: wishlists.id });

  return NextResponse.json(response);
}
