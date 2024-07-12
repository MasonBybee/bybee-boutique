"use client";
import { logout } from "@/actions/session";
import styles from "./LogoutBtn.module.css";

import React from "react";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const handleClick = async () => {
    logout().then(() => {
      router.push("/");
      router.refresh();
    });
  };
  return (
    <button className={styles.btn} onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutBtn;
