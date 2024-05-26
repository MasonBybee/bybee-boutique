import db from "@/db/db";
import { reviews } from "@/schema/Review";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId?: number;
  rating?: number;
  comment?: string;
  reviewDate?: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, params.id));

  return NextResponse.json(response[0]);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;

  const data: data = await request.json();

  const response = await db
    .update(reviews)
    .set({ userId: params.userId, ...data })
    .where(eq(reviews.id, params.id));

  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {
  const { params } = context;

  const response = db
    .delete(reviews)
    .where(eq(reviews.id, params.id))
    .returning({ deletedId: reviews.id });

  return NextResponse.json(response);
}
