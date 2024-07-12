"use server";

import db from "@/lib/db/db";
import { InventoryWithImages } from "@/lib/types";

export const getProductImage = async (inventoryId: number) => {
  try {
    const productImage = await db.query.images.findFirst({
      where: (images, { eq }) => eq(images.inventoryId, inventoryId),
    });
    if (productImage) {
      return { success: true, data: productImage };
    }
    return { success: false, error: "Something went wrong" };
  } catch (e) {
    return { success: false, error: "something went wrong" };
  }
};

export const getProductWithImage = async (
  inventoryId: number
): Promise<InventoryWithImages | null> => {
  try {
    const product = await db.query.inventory.findFirst({
      where: (inventory, { eq }) => eq(inventory.id, inventoryId),
      with: { images: true },
    });

    if (product) {
      return product as InventoryWithImages;
    }

    return null;
  } catch (e) {
    console.error("Error fetching product with images:", e);
    return null;
  }
};
