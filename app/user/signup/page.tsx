import React from "react";
import SignUpForm from "@/components/SignUpForm";

const SignupPage = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        height: "65vh",
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignupPage;
