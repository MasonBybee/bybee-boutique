"use server";
import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { categories } from "@/lib/schema/Category";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getCategories = cache(async () => {
  try {
    const result = await db.query.categories.findMany({
      with: {
        image: true,
      },
    });
    if (result) {
      return result;
    } else {
      throw new CustomError(500, "Internal Server Error");
    }
  } catch (e) {
    throw e;
  }
});

export const getCategory = cache(async (categoryName: string) => {
  try {
    const category = await db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.name, categoryName),
      with: {
        products: {
          with: {
            images: true,
          },
        },
      },
    });

    if (category) {
      return category;
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (e) {
    throw e;
  }
});

export const getCategoryName = async (categoryId: number) => {
  try {
    const response = await db
      .select({ name: categories.name })
      .from(categories)
      .where(eq(categories.id, categoryId));
    if (response[0]) {
      return { success: true, data: response[0].name };
    }
    return { success: false, error: "Error getting category name" };
  } catch (e) {
    return { success: false, error: "Error getting category name" };
  }
};
