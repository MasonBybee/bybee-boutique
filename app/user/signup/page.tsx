"use server";
import React from "react";
import styles from "./page.module.css";
import SignUpForm from "@/components/SignUpForm";

const SignupPage = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignupPage;
