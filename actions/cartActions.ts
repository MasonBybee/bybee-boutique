"use server";

import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { cartItems } from "@/lib/schema/CartItems";
import { and, eq } from "drizzle-orm";

export const getCart = async (cartId: number) => {
  try {
    const response = await db.query.cartItems.findMany({
      where: (cartItems, { eq }) => eq(cartItems.cartId, cartId),
      with: { product: { with: { images: true } } },
    });
    if (response.length) {
      return { success: true, data: response };
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
    const response = await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.inventoryId, inventoryId)
        )
      )
      .returning({ deleted: cartItems.id });
    if (response[0].deleted) {
      return { success: true };
    }
    return { success: false };
  } catch (e) {
    return { success: false };
  }
};

export const emptyCart = async (cartId: number) => {
  try {
    const response = await db
      .delete(cartItems)
      .where(eq(cartItems.cartId, cartId))
      .returning({ deletedFrom: cartItems.cartId });
    if (response.length) {
      return response[0];
    }
    return { success: false, error: "Failed to empty Cart" };
  } catch (e) {
    return { success: false, error: "Failed to empty Cart" };
  }
};
