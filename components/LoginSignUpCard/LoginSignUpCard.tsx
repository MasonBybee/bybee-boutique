import React from "react";
import Link from "next/link";
import styles from "./LoginSignUpCard.module.css";

const LoginSignUpCard = () => {
  return (
    <div className={styles.container}>
      <p className={styles.signIn}>Ready to join the colony?</p>
      <Link className={styles.signInBtn} href={"/user/signup"}>
        Sign Up
      </Link>
      <p className={styles.signIn}>Already a worker bee?</p>
      <Link className={styles.signInBtn} href={"/user/login"}>
        Login
      </Link>
    </div>
  );
};

export default LoginSignUpCard;
