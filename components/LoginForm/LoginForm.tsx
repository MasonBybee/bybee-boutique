"use client";
import { login } from "@/actions/session";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormErrors, FormResponse, LoginFormValues } from "@/lib/types";
import Loading from "../Loading";
const LoginForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async () => {
    startTransition(() => {
      login(formData).then((response: FormResponse) => {
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
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} action={onSubmit}>
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
