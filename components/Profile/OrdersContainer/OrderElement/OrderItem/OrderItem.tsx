import React from "react";
import styles from "./OrderItem.module.css";
import { InventoryWithImages } from "@/lib/types";

const OrderItem = ({
  product,
  quantity,
}: {
  product: InventoryWithImages;
  quantity: number;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <a className={styles.link} href={`/product/${product.id}`}>
          <img
            className={styles.CardImg}
            src={product.images[0].image}
            alt={product.description}
          />
          <p className={styles.name}>
            {quantity} x {product.name}
          </p>
          <p className={styles.price}>
            <b>${product.unitPrice}</b>
          </p>
        </a>
      </div>
    </div>
  );
};

export default OrderItem;
