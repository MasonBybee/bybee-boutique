"use client";
import { signup } from "@/actions/session";
import styles from "./SignUpForm.module.css";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormErrors, FormResponse } from "@/lib/types";
import Loading from "../Loading";

const SignUpForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    checkPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async () => {
    startTransition(() => {
      signup(formData).then((response: FormResponse) => {
        if (!response.errors) {
          router.push("/");
        } else {
          setErrors(response.errors);
        }
      });
    });
  };
  if (isPending) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
      <form className={styles.form} action={onSubmit}>
        <div className={styles.inputWrapper}>
          <input
            name="firstName"
            type="text"
            id="firstName"
            className={styles.formInput}
            placeholder="First Name"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="firstName" className={styles.formLabel}>
            First Name
          </label>
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            name="lastName"
            type="text"
            id="lastName"
            className={styles.formInput}
            placeholder="Last Name"
            autoComplete="family-name"
            onChange={handleChange}
            value={formData.lastName}
          />
          <label htmlFor="lastName" className={styles.formLabel}>
            Last Name
          </label>
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            name="email"
            type="email"
            id="email"
            className={styles.formInput}
            placeholder="Email Address"
            autoComplete="email"
            onChange={handleChange}
            value={formData.email}
          />
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            name="username"
            type="text"
            id="username"
            className={styles.formInput}
            placeholder="Username"
            autoComplete="username"
            onChange={handleChange}
            value={formData.username}
          />
          <label htmlFor="username" className={styles.formLabel}>
            Username
          </label>
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            name="password"
            type="password"
            id="password"
            className={styles.formInput}
            placeholder="Password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
          />
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            name="checkPassword"
            type="password"
            id="checkPassword"
            className={styles.formInput}
            autoComplete="new-password"
            placeholder="Confirm Password"
            value={formData.checkPassword}
            onChange={handleChange}
          />
          <label htmlFor="checkPassword" className={styles.formLabel}>
            Check Password
          </label>
          {errors.checkPassword && (
            <p className={styles.error}>{errors.checkPassword}</p>
          )}
        </div>
        <div style={{ position: "relative" }}>
          {" "}
          <button
            type="submit"
            className={`${styles.btn} ${styles["md:span-2"]}`}
          >
            Sign Up
          </button>
          {errors.submit && <p className={styles.error}>{errors.submit}</p>}
        </div>
      </form>
      <p>
        Returning worker bee? Login{" "}
        <Link className={styles.link} href="/user/signup">
          <b>HERE!</b>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
