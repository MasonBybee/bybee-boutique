"use client";
import { updateProfileSession } from "@/actions/session";
import styles from "./EditProfile.module.css";
import React, { useState, useTransition } from "react";
import { FormErrors, FormResponse } from "@/lib/types";
import Loading from "@/components/Loading";

const EditProfile = ({ setTriggerEffect, user }: any) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      updateProfileSession(formData).then((response: FormResponse) => {
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
      <form className={styles.form} action={onSubmit}>
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
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
        <div className={`${styles.inputWrapper} ${styles["md:span-2"]}`}>
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
