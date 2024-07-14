import React from "react";
import styles from "./Wishlist.module.css";
import { Image } from "@/lib/schema/Image";
import { WishlistItems } from "@/lib/schema/WishlistItems";
import { InventoryWithImages } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface WishlistProps {
  products: InventoryWithImages[];
  wishlistId: number;
  wishlist: WishlistItems[];
}

const Wishlist: React.FC<WishlistProps> = ({
  products,
  wishlistId,
  wishlist,
}) => {
  return (
    <div>
      <h2>Wishlist</h2>
      <div className={styles.productContainer}>
        <ul>
          {products ? (
            products.map((product) => {
              return (
                <ProductCard
                  product={product}
                  wishlist={wishlist}
                  key={product.id}
                  wishlistId={wishlistId}
                />
              );
            })
          ) : (
            <p>
              Nothing found in your wishlist! Add products to your wishlist by
              clicking the heart on any product.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Wishlist;
