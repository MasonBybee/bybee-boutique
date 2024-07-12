"use server";

import db from "@/lib/db/db";
import { Image, images } from "@/lib/schema/Image";
import { inventory } from "@/lib/schema/Inventory";
import { WishlistItems, wishlistItems } from "@/lib/schema/WishlistItems";
import { InventoryWithImages } from "@/lib/types";
import { and, eq, inArray } from "drizzle-orm";

export const getWishlist = async (wishlistId: number) => {
  try {
    const response = await db.query.wishlistItems.findMany({
      where: (wishlistItems, { eq }) =>
        eq(wishlistItems.wishlistId, wishlistId),
    });
    if (response) {
      return { success: true, data: response };
    }
    return { success: false, error: "Error retrieving wishlist" };
  } catch (e) {
    return { success: false, error: "Error retrieving wishlist" };
  }
};

const convertToInventoryWithImages = (
  wishlistResponse: {
    inventory: {
      id: number;
      name: string;
      description: string;
      stock: number;
      unitPrice: string;
      categoryId: number;
    };
    images: Image | null;
  }[]
): InventoryWithImages[] => {
  const inventoryMap = new Map<number, InventoryWithImages>();

  wishlistResponse.forEach((row) => {
    const inventoryId = row.inventory.id;

    if (!inventoryMap.has(inventoryId)) {
      inventoryMap.set(inventoryId, {
        id: row.inventory.id,
        name: row.inventory.name,
        description: row.inventory.description,
        stock: row.inventory.stock,
        unitPrice: row.inventory.unitPrice,
        categoryId: row.inventory.categoryId,
        images: [],
      });
    }

    const inventory = inventoryMap.get(inventoryId);
    if (inventory && row.images) {
      inventory.images.push(row.images);
    }
  });
  const response: InventoryWithImages[] = Array.from(inventoryMap.values());
  console.log(response);
  return response;
};

export const getWishlistProducts = async (wishlistItemIds: WishlistItems[]) => {
  try {
    const inventoryIds = wishlistItemIds.map((item) => item.inventoryId);
    const response = await db
      .select({
        inventory: {
          id: inventory.id,
          name: inventory.name,
          description: inventory.description,
          stock: inventory.stock,
          unitPrice: inventory.unitPrice,
          categoryId: inventory.categoryId,
        },
        images: {
          id: images.id,
          description: images.description,
          categoryId: images.categoryId,
          inventoryId: images.inventoryId,
          image: images.image,
        },
      })
      .from(inventory)
      .leftJoin(images, eq(images.inventoryId, inventory.id))
      .where(inArray(inventory.id, inventoryIds));
    if (response) {
      const convertedResponse: InventoryWithImages[] =
        convertToInventoryWithImages(response);

      return { success: true, data: convertedResponse };
    }
    return { success: false, error: "Error retrieving wishlist" };
  } catch (e) {
    return { success: false, error: "Error retrieving wishlist" };
  }
};

export const addWishlistItem = async (
  wishlistId: number,
  productId: number
) => {
  try {
    const response = await db
      .insert(wishlistItems)
      .values({ wishlistId: wishlistId, inventoryId: productId })
      .returning();
    if (response) {
      return { success: true, data: response };
    }
    return { success: false, error: "Error adding product to wishlist" };
  } catch (e) {
    return { success: false, error: "Error adding product to wishlist" };
  }
};

export const removeWishlistItem = async (
  wishlistId: number,
  productId: number
) => {
  try {
    const response = await db
      .delete(wishlistItems)
      .where(
        and(
          eq(wishlistItems.inventoryId, productId),
          eq(wishlistItems.wishlistId, wishlistId)
        )
      )
      .returning({ deletedId: wishlistItems.id });
    if (response) {
      return { success: true, data: response };
    }
    return { success: false, error: "Error removing product from wishlist" };
  } catch (e) {
    return { success: false, error: "Error removing product from wishlist" };
  }
};
