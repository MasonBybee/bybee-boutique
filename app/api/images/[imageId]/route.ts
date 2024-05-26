import db from "@/db/db";
import { images } from "@/schema/Image";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  image: string;
  description: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const dbImage = await db
    .select()
    .from(images)
    .where(eq(images.id, params.imageId));

  return NextResponse.json(dbImage);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data = await request.json();
  const response = await db
    .update(images)
    .set(data)
    .where(eq(images.id, params.imageId));
  return NextResponse.json(response);
}

export async function DELETE(request: Request, context: any) {}
