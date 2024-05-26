import db from "@/db/db";
import { reviews } from "@/schema/Review";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  inventoryId: number;
  rating: number;
  comment: string;
  reviewDate: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const response = await db
    .select()
    .from(reviews)
    .where(eq(reviews.userId, params.userId));

  return NextResponse.json(response);
}

export async function POST(request: Request, context: any) {
  const data: data = await request.json();
  const { params } = context;
  const response = await db
    .insert(reviews)
    .values({ userId: params.userId, ...data })
    .returning();
  return NextResponse.json(response[0]);
}
