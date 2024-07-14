"use server";
import db from "@/lib/db/db";
import {
  AddressAndPaymentFormData,
  CartItemWithImage,
  OrderValues,
} from "@/lib/types";
import { emptyCart, getCart } from "./cartActions";
import { getSession } from "./session";
import { calcTaxAndShipping, getQtyAndSubtotal } from "./helperActions";
import { orders } from "@/lib/schema/Order";
import { NewOrderItem, orderItems } from "@/lib/schema/OrderItems";
import { addressAndPaymentFormValidator } from "./formValidation";

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

const formatCartItemsToOrderItems = (
  cartItems: CartItemWithImage[],
  orderId: number
) => {
  const orderItems: NewOrderItem[] = [];
  for (let item of cartItems) {
    orderItems.push({
      orderId: orderId,
      inventoryId: item.product.id,
      quantity: item.quantity,
      price: item.product.unitPrice,
    } as NewOrderItem);
  }
  return orderItems;
};

export const completeOrder = async (formData: AddressAndPaymentFormData) => {
  try {
    const errors = addressAndPaymentFormValidator(formData);
    if (Object.keys(errors).length) {
      console.log(errors);
      return { success: false, errors: errors };
    }
    const session = await getSession(true);
    if (session && session.cartId) {
      const cart = await getCart(session.cartId);
      if (cart.success && cart.data) {
        const [numOfItems, subtotal] = getQtyAndSubtotal(cart.data!);
        const [shipping, tax, total] = calcTaxAndShipping(numOfItems, subtotal);

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        const formattedDate = `${day}-${month}-${year}`;

        const orderId = await db
          .insert(orders)
          .values({
            userId: session.userId,
            subtotal: total.toString(),
            discount: "0",
            tax: tax.toString(),
            status: "ordered",
            orderDate: formattedDate,
          })
          .returning({ orderId: orders.id });

        const orderItemsArr = formatCartItemsToOrderItems(
          cart.data!,
          orderId[0].orderId
        );
        if (orderItemsArr.length) {
          const response = await db
            .insert(orderItems)
            .values(orderItemsArr)
            .returning();
          if (response.length) {
            await emptyCart(session.cartId);
            return { success: true };
          }
        }
      }
    }
    return { success: false };
  } catch (e) {
    return { success: false };
  }
};
