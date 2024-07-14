import React from "react";
import styles from "./OrderElement.module.css";
import { OrderValues } from "@/lib/types";
import OrderItem from "./OrderItem";

const OrderElement = ({ order }: { order: OrderValues }) => {
  return (
    <div className={styles.orderElementContainer}>
      <div className={styles.orderBanner}>
        <div className={styles.bannerContainer}>
          <p className={styles.bannerLabel}>Order Placed:</p>
          <p className={styles.bannerValue}>{order.orderDate}</p>
        </div>
      </div>
      <div className={styles.orderBanner}>
        <div className={styles.bannerContainer}>
          <p className={styles.bannerLabel}>Total:</p>
          <p className={styles.bannerValue}>${order.subtotal}</p>
        </div>
      </div>
      <div className={styles.orderItemsContainer}>
        {order.items.length &&
          order.items.map((orderItem) => {
            return (
              <OrderItem
                quantity={orderItem.quantity}
                product={orderItem.product}
              />
            );
          })}
      </div>
    </div>
  );
};

export default OrderElement;
