import { getProductWithImage } from "@/actions/inventoryActions";
import React from "react";
import styles from "./page.module.css";
import WishlistButton from "@/components/WishlistButton";
import { getSession } from "@/actions/session";
import { getWishlist } from "@/actions/wishlistActions";

const ProductPage = async ({ params }: { params: { inventoryId: number } }) => {
  const product = await getProductWithImage(params.inventoryId);
  const user = await getSession(true);
  const wishlist = await getWishlist(user.wishlistId);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <WishlistButton
          wishlist={wishlist.data!}
          wishlistId={user.wishlistId}
          productId={product?.id!}
        />
        <img
          className={styles.image}
          src={product?.images[0].image}
          alt={product?.images[0].description}
        />
      </div>
      <div className={styles.orderInfoContainer}>
        <h3 className={styles.productName}>{product?.name}</h3>
        <p className={styles.price}>${product?.unitPrice}</p>
        <h5 className={styles.stockLabel}>In Stock: {product?.stock}</h5>
        <form action="">
          <label className={styles.sizeLabel} htmlFor="size">
            Size:
          </label>
          <select id="size" name="size">
            <option value="0">S</option>
            <option value="1">M</option>
            <option value="2">L</option>
            <option value="3">XL</option>
            <option value="4">XXL</option>
          </select>
          <br />
          <label className={styles.qtyLabel}>QTY:</label>
          <input className={styles.qtyInput} type="number" />
          <button className={styles.addToCartButton}>Add To Cart</button>
        </form>
        <h5 className={styles.detailsLabel}>Details:</h5>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
