import { getProductWithImage } from "@/actions/inventoryActions";
import React from "react";
import styles from "./page.module.css";
import WishlistButton from "@/components/WishlistButton";
import { getSession } from "@/actions/session";
import { getWishlist } from "@/actions/wishlistActions";
import ProductForm from "@/components/ProductForm";
import { getCategoryName } from "@/actions/categoryActions";

const ProductPage = async ({ params }: { params: { inventoryId: number } }) => {
  const product = await getProductWithImage(params.inventoryId);
  const user = await getSession(true);
  const wishlist = await getWishlist(user.wishlistId);
  const category = await getCategoryName(product?.categoryId!);
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
        <ProductForm
          category={category.data!}
          cartId={user.cartId}
          inventoryId={product?.id!}
        />
        <h5 className={styles.detailsLabel}>Details:</h5>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
