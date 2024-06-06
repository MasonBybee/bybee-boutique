"use server";

import React from "react";
import styles from "./Navbar.module.css";
import ProfileBtn from "../ProfileBtn/ProfileBtn";
import NavLink from "../NavLink";
import {
  faHeart,
  faShirt,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ExtendedSession } from "@/lib/session";

interface NavbarProps {
  session: ExtendedSession;
}
const Navbar: React.FC<NavbarProps> = ({ session }) => {
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
          {session?.isLoggedIn ? (
            <NavLink icon={faUser} href={"/user/profile"}>
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
