import { getCategory } from "@/actions/categoryActions";
import { getSession } from "@/actions/session";
import { getWishlist } from "@/actions/wishlistActions";
import ProductCard from "@/components/ProductCard";
import { WishlistItems } from "@/lib/schema/WishlistItems";
import { CategoryWithProduct, InventoryWithImages } from "@/lib/types";
import React from "react";
import styles from "./page.module.css";

const CategoryPage = async ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const category = (await getCategory(
    params.categoryName
  )) as CategoryWithProduct;
  const user = await getSession(true);
  let wishlistId = 0;
  if (user.isLoggedIn && user.wishlistId) {
    wishlistId = user.wishlistId;
  }
  let wishlistItems: WishlistItems[] | [] = [];
  if (user.isLoggedIn && user.wishlistId) {
    const wishlist = await getWishlist(user.wishlistId);
    if (wishlist.success && wishlist.data) {
      wishlistItems = wishlist.data;
    }
  }
  return (
    <>
      <h1 className={styles.title}>{category?.name}</h1>
      <div className={styles.productContainer}>
        {category.products.map((product: InventoryWithImages, index) => {
          return (
            <ProductCard
              wishlist={wishlistItems}
              wishlistId={wishlistId}
              key={index}
              product={product}
            />
          );
        })}
      </div>
    </>
  );
};

export default CategoryPage;
