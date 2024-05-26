import db from "@/db/db";
import { images } from "@/schema/Image";
import { NextResponse } from "next/server";

interface data {
  image: string;
  description: string;
  inventoryId?: number;
  category_id?: number;
}

export async function GET() {
  const response = await db.query.images.findMany();

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const result = await db.insert(images).values(data).returning();

  return NextResponse.json(result[0]);
}
