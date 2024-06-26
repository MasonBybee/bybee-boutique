"use server";
import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { cache } from "react";
import fixResults from "./fixResults";

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
        products: true,
      },
    });
    console.log(category);
    return fixResults(category);
    if (category) {
      return fixResults(category);
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (e) {
    throw e;
  }
});
