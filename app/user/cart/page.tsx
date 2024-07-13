import React from "react";
import styles from "./page.module.css";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/cartActions";
import { cartItemWithImage } from "@/lib/types";
import CartItem from "@/components/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CartPage = async () => {
  const session = await getSession(true);
  if (!session.isLoggedIn) {
    redirect("/user/login");
  }
  const response = await getCart(session.cartId);
  let userCart: cartItemWithImage[] | [] = [];
  if (response.success && response.data) {
    userCart = response.data;
  }
  const getQtyAndSubtotal = () => {
    let qty = 0;
    let subtotal = 0;
    for (let item of userCart) {
      qty += item.quantity;
      subtotal += Number(item.product.unitPrice) * item.quantity;
    }
    return [qty, subtotal];
  };
  const [numOfItems, subtotal] = getQtyAndSubtotal();

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
