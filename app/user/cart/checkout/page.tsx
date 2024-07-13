import React from "react";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

const CheckoutPage = async () => {
  const session = await getSession(true);
  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.deliveryContainer}></div>
    </div>
  );
};

export default CheckoutPage;
