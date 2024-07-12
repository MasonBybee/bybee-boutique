"use client";
import { updatePassword } from "@/actions/session";
import styles from "./EditPassword.module.css";
import React, { useState, useTransition } from "react";
import { FormErrors, FormResponse } from "@/lib/types";
import Loading from "@/components/Loading";

const EditProfile = ({ setTriggerEffect, user }: any) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    password: "",
    checkPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      updatePassword(formData).then((response: FormResponse) => {
        if (!response.errors) {
          setTriggerEffect(true);
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
      <h2 style={{ textAlign: "left" }}>Create New Password</h2>
      <form className={styles.form} action={onSubmit}>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
          <input
            name="password"
            type="password"
            id="password"
            className={styles.formInput}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
            placeholder="Confirm Password"
            autoComplete="family-name"
            onChange={handleChange}
            value={formData.checkPassword}
          />
          <label htmlFor="checkPassword" className={styles.formLabel}>
            Confirm Password
          </label>
          {errors.checkPassword && (
            <p className={styles.error}>{errors.checkPassword}</p>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <button
            type="submit"
            className={`${styles.btn} ${styles["md:span-2"]}`}
          >
            Update
          </button>
          {errors.submit && <p className={styles.error}>{errors.submit}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
