"use client";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import { cartItemWithImage } from "@/lib/types";
import styles from "./CartItem.module.css";
import { deleteCartItem, updateCartItem } from "@/actions/cartActions";
import { useRouter } from "next/navigation";
import { addWishlistItem } from "@/actions/wishlistActions";

const CartItem = ({
  cartItem,
  wishlistId,
}: {
  cartItem: cartItemWithImage;
  wishlistId: number;
}) => {
  const router = useRouter();
  const [data, setData] = useState(cartItem.quantity);
  const [isPending, startTransition] = useTransition();
  const product = cartItem.product;

  const deleteItem = () => {
    deleteCartItem(cartItem.cartId, cartItem.product.id).then((response) => {
      if (response?.success) {
        router.refresh();
      }
    });
  };

  useEffect(() => {
    startTransition(() => {
      if (data === 0) {
        deleteItem();
      } else if (data > 0) {
        updateCartItem(cartItem.cartId, cartItem.product.id, data);
        router.refresh();
      }
    });
  }, [data]);

  const addToWishlist = () => {
    startTransition(() => {
      addWishlistItem(wishlistId, product.id).then((resp) => {
        if (resp.success) {
          deleteItem();
        }
      });
    });
  };

  const deleteFromCart = () => {
    startTransition(() => {
      deleteItem();
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`SETTING DATA TO: ${e.target.value}`);
    setData(Number(e.target.value));
  };
  return (
    <div className={styles.productContainer}>
      <img
        className={styles.image}
        src={product.images[0].image}
        alt={product.images[0].description}
      />

      <div className={styles.infoContainer}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
          {product.stock > 0 ? "In Stock" : "Out Of Stock"}
        </p>
        <div className={styles.sizeContainer}>
          <h5 className={styles.sizeLabel}>Size:</h5>
          <p className={styles.sizeValue}>&nbsp; M</p>
        </div>
        <div className={styles.qtyContainer}>
          <label htmlFor="qty" className={styles.qtyLabel}>
            QTY:
          </label>
          &nbsp;
          <input
            min={0}
            onChange={handleChange}
            value={data}
            className={styles.qtyInput}
            type="number"
            name="qty"
            id="qty"
          />
        </div>
        <div className={styles.actionsContainer}>
          <p className={styles.actionP}>
            |&nbsp;
            <button onClick={addToWishlist} className={styles.actionButton}>
              Move to Wishlist
            </button>
            &nbsp;|&nbsp;
            <button onClick={deleteFromCart} className={styles.actionButton}>
              Delete
            </button>
            &nbsp;|
          </p>
        </div>
      </div>
      <h3 className={styles.productPrice}>${product.unitPrice}</h3>
    </div>
  );
};

export default CartItem;
