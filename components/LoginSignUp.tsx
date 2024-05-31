import React from "react";
import Link from "next/link";

const LoginSignUp = () => {
  return (
    <div>
      <p className="signIn">Ready to join the colony?</p>
      <Link className="signInBtn" href={"/user/signup"}>
        Sign Up
      </Link>
      <p className="signIn">Already a worker bee?</p>
      <Link className="signInBtn" href={"/user/login"}>
        Login
      </Link>
    </div>
  );
};

export default LoginSignUp;
