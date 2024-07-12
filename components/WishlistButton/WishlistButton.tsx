"use client";
import React, { useEffect, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "./WishlistButton.module.css";
import { WishlistItems } from "@/lib/schema/WishlistItems";
import { useRouter } from "next/navigation";
import { addWishlistItem, removeWishlistItem } from "@/actions/wishlistActions";

interface WishlistButtonProps {
  wishlistId: number;
  productId: number;
  wishlist: WishlistItems[];
}

const WishlistButton = ({
  wishlistId,
  wishlist,
  productId,
}: WishlistButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [inWishlist, setInWishlist] = useState<boolean>(false);
  const router = useRouter();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (wishlistId === 0) {
      router.push("/user/login");
      return;
    }
    if (inWishlist) {
      startTransition(() => {
        removeWishlistItem(wishlistId, productId).then((response) => {
          if (response.success) {
            setInWishlist(false);
          }
        });
      });
    }

    if (!inWishlist) {
      startTransition(() => {
        addWishlistItem(wishlistId, productId).then((response) => {
          if (response.success) {
            setInWishlist(true);
          }
        });
      });
    }
  };
  useEffect(() => {
    for (let item of wishlist) {
      if (item.inventoryId === productId) {
        setInWishlist(true);
      }
    }
  }, []);

  return (
    <button onClick={handleClick} className={styles.wishlistBtn}>
      {inWishlist ? (
        <FontAwesomeIcon icon={faHeartSolid} />
      ) : (
        <FontAwesomeIcon icon={faHeart} />
      )}
    </button>
  );
};

export default WishlistButton;
