import db from "@/db/db";
import { categories } from "@/schema/Category";
import { images } from "@/schema/Image";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  name: string;
  description: string;
}

export async function GET() {
  const response = await db.query.categories.findMany({
    with: {
      image: true,
    },
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const data: data = await request.json();
  const result = await db.insert(categories).values(data).returning();

  return NextResponse.json(result[0]);
}
