import React from "react";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/cartActions";
import CheckoutForm from "@/components/CheckoutForm";
import { CartItemWithImage } from "@/lib/types";

const CheckoutPage = async () => {
  const session = await getSession(true);
  const cartResp = await getCart(session.cartId);
  const cart: CartItemWithImage[] | undefined = cartResp.data
    ? cartResp.data
    : undefined;
  if (!session.isLoggedIn || !cart || !cart.length) {
    redirect("/");
  }
  return (
    <div style={{ padding: "30px" }}>
      <CheckoutForm session={session} cart={cart} />
    </div>
  );
};

export default CheckoutPage;
