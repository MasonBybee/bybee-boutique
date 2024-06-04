import { login } from "@/actions/session";
import React from "react";

const LoginForm = () => {
  return (
    <form className="loginForm" action={login} method="POST">
      <label htmlFor="username">Username</label>
      <input placeholder="Username" id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input placeholder="Password" id="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
