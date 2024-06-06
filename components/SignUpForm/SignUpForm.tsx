"use client";
import { signup } from "@/actions/session";
import styles from "./SignUpForm.module.css";
import { SignUpFormValues } from "@/lib/types";
import Link from "next/link";
import { useForm, useFormState } from "react-hook-form";

interface SignUpFormProps {
  signup: (data: SignUpFormValues) => void;
}

const SignUpForm = ({ handleChange }) => {
  const { control, register, handleSubmit } = useForm<SignUpFormValues>();
  const { errors } = useFormState({ control });

  const onSubmit = async (data: SignUpFormValues) => {
    handleChange(data);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="firstName"
            className={styles.formInput}
            placeholder="First Name"
            autoComplete="given-name"
            {...register("firstName", { required: "First name is required" })}
          />
          <label htmlFor="firstName" className={styles.formLabel}>
            First Name
          </label>
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            id="lastName"
            className={styles.formInput}
            placeholder="Last Name"
            autoComplete="family-name"
            {...register("lastName", { required: "Last Name is required" })}
          />
          <label htmlFor="lastName" className={styles.formLabel}>
            Last Name
          </label>
          {errors.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            placeholder="Email Address"
            autoComplete="email"
            {...register("email", { required: "Email Address is required" })}
          />
          <label htmlFor="email" className={styles.formLabel}>
            Email Address
          </label>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
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
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            type="password"
            id="checkPassword"
            className={styles.formInput}
            autoComplete="new-password"
            placeholder="Check Password"
            {...register("checkPassword", {
              required: "Check Password is required",
            })}
          />
          <label htmlFor="checkPassword" className={styles.formLabel}>
            Check Password
          </label>
          {errors.checkPassword && (
            <p className={styles.error}>{errors.checkPassword.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`${styles.btn} ${styles["md:span-2"]}`}
        >
          Sign Up
        </button>
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
