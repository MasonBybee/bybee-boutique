"use client";
import { logout } from "@/actions/session";
import { redirect } from "next/navigation";

import React from "react";

const LogoutBtn = () => {
  const handleClick = () => {
    logout();
    redirect("/");
  };
  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutBtn;
