import { login } from "@/actions/session";
import React from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} action={login}>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="username"
            id="username"
            className={styles.formInput}
            placeholder="Username"
            autoComplete="username"
          />
          <label htmlFor="username" className={styles.formLabel}>
            Username
          </label>
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            placeholder="Password"
            autoComplete="password"
          />
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
        </div>
        <button
          type="submit"
          className={`${styles.btn} ${styles["md:span-2"]}`}
        >
          Sign In
        </button>
      </form>
      <p>
        New to the hive? Sign up{" "}
        <Link className={styles.link} href={"/user/signup"}>
          <b>HERE!</b>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
