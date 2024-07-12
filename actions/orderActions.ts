"use server";
import db from "@/lib/db/db";
import { OrderValues } from "@/lib/types";

export const getOrders = async (
  id: number
): Promise<OrderValues[] | undefined> => {
  try {
    const response = await db.query.orders.findMany({
      where: (orders, { eq }) => eq(orders.userId, id),
    });
    if (response.length) {
      return response;
    } else return;
  } catch (e) {
    return;
  }
};
