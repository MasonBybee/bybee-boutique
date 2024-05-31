import db from "@/db/db";
import { categories } from "@/schema/Category";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface data {
  name?: string;
  description?: string;
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.name, params.name),
    with: {
      products: true,
    },
  });

  return NextResponse.json(category);
}

export async function PATCH(request: Request, context: any) {
  const { params } = context;
  const data: data = await request.json();
  const response = await db
    .update(categories)
    .set(data)
    .where(eq(categories.name, params.name))
    .returning();

  return NextResponse.json(response);
}
