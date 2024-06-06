"use client";
import { login } from "@/actions/session";
import React from "react";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import { LoginFormValues } from "@/lib/types";
import { useForm, useFormState } from "react-hook-form";
const LoginForm = () => {
  const { control, register, handleSubmit, setError } =
    useForm<LoginFormValues>();
  const { errors } = useFormState({ control });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch (error: Error | any) {
      if (error.message) console.error(error.message);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors;
        serverErrors.forEach(
          (serverError: { field: keyof LoginFormValues; message: string }) => {
            setError(serverError.field, {
              type: "server",
              message: serverError.message,
            });
          }
        );
      } else {
        // Fallback for unexpected errors
        setError("username", {
          type: "server",
          message: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="text"
            id="username"
            className={styles.formInput}
            placeholder="Username"
            autoComplete="username"
            {...register("username", { required: "Username is required" })}
          />
          <label htmlFor="username" className={styles.formLabel}>
            Username
          </label>
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
          />
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
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
