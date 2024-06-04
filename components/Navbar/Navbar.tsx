"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { getSession } from "@/actions/session";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import { SessionData } from "@/lib/session";
import NavLink from "../NavLink";
import {
  faHeart,
  faShirt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [user, setUser] = useState<SessionData | null>(null);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      getSession().then((user) => {
        setUser(user);
      });
    });
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navul}>
        <li className={styles.navlileft}>
          <NavLink
            img={
              "https://res.cloudinary.com/dabfhr2dr/image/upload/v1716857040/bybeeBoutique_kjpaha.webp"
            }
            href={"/"}
          >
            Brand
          </NavLink>
        </li>
        <li className={styles.navlileft}>
          <NavLink icon={faShirt} href={"/clothing"}>
            Clothing
          </NavLink>
        </li>
        <li className={styles.navliright}>
          <NavLink icon={faShoppingCart} href={"/cart"}>
            Cart
          </NavLink>
        </li>
        <li className={styles.navliright}>
          {user?.isLoggedIn ? (
            <NavLink icon={faUser} href={"/profile"}>
              Profile
            </NavLink>
          ) : (
            <ProfileBtn />
          )}
        </li>
        <li className={styles.navliright}>
          <NavLink icon={faHeart} href={"/wishlist"}>
            Wishlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
