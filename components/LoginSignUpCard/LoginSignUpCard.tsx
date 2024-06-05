import React from "react";
import Link from "next/link";
import styles from "./LoginSignUpCard.module.css";

interface LoginSignUpCardProps {
  toggle: () => void;
}

const LoginSignUpCard: React.FC<LoginSignUpCardProps> = ({ toggle }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault();
    toggle();
    window.location.href = href;
  };

  return (
    <div className={styles.container}>
      <p className={styles.signIn}>Ready to join the colony?</p>
      <Link
        onClick={(e) => handleClick(e, "/user/signup")}
        className={styles.signInBtn}
        href="/user/signup"
      >
        Sign Up
      </Link>
      <p className={styles.signIn}>Already a worker bee?</p>
      <Link
        onClick={(e) => handleClick(e, "/user/login")}
        className={styles.signInBtn}
        href="/user/login"
      >
        Login
      </Link>
    </div>
  );
};
export default LoginSignUpCard;
