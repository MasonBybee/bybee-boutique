import React from "react";
import styles from "./page.module.css";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/cartActions";
import { CartItemWithImage } from "@/lib/types";
import CartItem from "@/components/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { getQtyAndSubtotal } from "@/actions/helperActions";

const CartPage = async () => {
  const session = await getSession(true);
  if (!session.isLoggedIn) {
    redirect("/user/login");
  }
  const response = await getCart(session.cartId);
  let userCart: CartItemWithImage[] | [] = [];
  if (response.success && response.data) {
    userCart = response.data;
  }

  const [numOfItems, subtotal] = getQtyAndSubtotal(userCart);

  return (
    <div>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.container}>
        <div className={styles.cartContainer}>
          {userCart.length ? (
            userCart.map((cartItem, index) => {
              return (
                <CartItem
                  key={index}
                  wishlistId={session.wishlistId}
                  cartItem={cartItem}
                />
              );
            })
          ) : (
            <div className={styles.emptyCart}>
              <FontAwesomeIcon icon={faCartShopping} />
              <h3>Your cart is empty!</h3>
            </div>
          )}
          <div className={styles.subtotalContainer}>
            <p>
              Subtotal ({numOfItems} Item): <b>${subtotal}</b>
            </p>
          </div>
        </div>
        <div className={styles.checkoutContainer}>
          <p className={styles.checkoutSubtotal}>
            Subtotal ({numOfItems} Item): <b>${subtotal}</b>
          </p>
          <div className={styles.checkoutButtonContainer}>
            <a className={styles.checkoutButton} href="/user/cart/checkout">
              Proceed to checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
