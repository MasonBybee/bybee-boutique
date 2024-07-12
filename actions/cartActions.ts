"use server";

import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { CartItem, cartItems } from "@/lib/schema/CartItems";
import { images } from "@/lib/schema/Image";
import { inventory } from "@/lib/schema/Inventory";
import { InventoryWithImages } from "@/lib/types";
import { and, eq, inArray } from "drizzle-orm";
import { convertToInventoryWithImages } from "./helperActions";

export const getCart = async (cartId: number) => {
  try {
    const response = await db.query.cartItems.findMany({
      where: (cartItems, { eq }) => eq(cartItems.cartId, cartId),
    });
    if (response) {
      return { success: true, data: response };
    }
    return { success: false, error: "Error retrieving cart" };
  } catch (e) {
    return { success: false, error: "Error retrieving cart" };
  }
};

export const getCartProducts = async (cartItemIds: CartItem[]) => {
  try {
    const inventoryIds = cartItemIds.map((item) => item.inventoryId);
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
    return { success: false, error: "Error retrieving cart" };
  } catch (e) {
    return { success: false, error: "Error retrieving cart" };
  }
};

export const addCartItem = async (
  cartId: number,
  inventoryId: number,
  quantity: number
) => {
  try {
    const result = await db
      .insert(cartItems)
      .values({ cartId: cartId, inventoryId: inventoryId, quantity: quantity })
      .onConflictDoNothing()
      .returning();
    if (result[0]) {
      return { success: true, data: result };
    }
    return { success: false, error: "Error adding item to cart" };
  } catch (e) {
    return { success: false, error: "Error adding item to cart" };
  }
};

export const updateCartItem = async (
  cartId: number,
  inventoryId: number,
  quantity: number
) => {
  try {
    if (!quantity) {
      return await deleteCartItem(cartId, inventoryId);
    }
    const result = db
      .update(cartItems)
      .set({ quantity: quantity })
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.inventoryId, inventoryId)
        )
      )
      .returning();
    return result;
  } catch (e) {
    throw new CustomError(500, "Internal Server Error");
  }
};

export const deleteCartItem = async (cartId: number, inventoryId: number) => {
  try {
    const result = await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.inventoryId, inventoryId)
        )
      )
      .returning({ deleted: cartItems.id });
    return result[0];
  } catch (e) {
    throw new CustomError(500, "Internal Server Error");
  }
};
