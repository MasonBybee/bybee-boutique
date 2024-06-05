"use server";

import CustomError from "@/lib/CustomError";
import db from "@/lib/db/db";
import { cartItems } from "@/lib/schema/CartItems";
import { and, eq } from "drizzle-orm";

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
    if (!result[0]) {
      throw new CustomError(409, "Database Conflict");
    }
    return result[0];
  } catch (e) {
    throw new CustomError(500, "Internal Server Error");
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
