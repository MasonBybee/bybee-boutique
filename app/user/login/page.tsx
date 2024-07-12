import React from "react";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        height: "65vh",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
