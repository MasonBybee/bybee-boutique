"use client";
import React from "react";
import styles from "./ProductCard.module.css";
import WishlistButton from "../WishlistButton";
import { Image } from "@/lib/schema/Image";
import { WishlistItems } from "@/lib/schema/WishlistItems";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    stock: number;
    unitPrice: string;
    categoryId: number;
    images: Image[];
  };
  index: number;
  wishlistId: number;
  wishlist: WishlistItems[];
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  index,
  wishlistId,
  wishlist,
}) => {
  return (
    <li key={index} className={styles.container}>
      <div className={styles.card}>
        <WishlistButton
          wishlist={wishlist}
          productId={product.id}
          wishlistId={wishlistId}
        />
        <a className={styles.link} href={`/product/${product.id}`}>
          <img
            className={styles.CardImg}
            src={product.images[0].image}
            alt={product.description}
          />
          <p className={styles.name}>{product.name}</p>
          <p className={styles.price}>
            <b>${product.unitPrice}</b>
          </p>
        </a>
      </div>
    </li>
  );
};

export default ProductCard;
