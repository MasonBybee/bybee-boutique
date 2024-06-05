import React from "react";
import styles from "./SignUpForm.module.css";
import { signup } from "@/actions/session";
import Link from "next/link";

const SignUpForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
      <form className={styles.form} action={signup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="firstName"
            className={styles.formInput}
            placeholder="First Name"
            autoComplete="given-name"
          />
          <label htmlFor="firstName" className={styles.formLabel}>
            First Name
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="lastLame"
            className={styles.formInput}
            placeholder="Last Name"
            autoComplete="family-name"
          />
          <label htmlFor="lastName" className={styles.formLabel}>
            Last Name
          </label>
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            placeholder="Email Address"
            autoComplete="email"
          />
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
        </div>
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
        Returning worker bee? Login{" "}
        <Link className={styles.link} href={"/user/signup"}>
          <b>HERE!</b>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
