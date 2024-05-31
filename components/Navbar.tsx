"use server";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="navlileft">
          <Link className="navlink" href={"/"}>
            Brand
          </Link>
        </li>
        <li className="navlileft">
          <Link className="navlink" href={"/clothing"}>
            Clothing
          </Link>
        </li>
        <li className="navliright">
          <Link className="navlink" href={"/cart"}>
            Cart
          </Link>
        </li>
        <li className="navliright">
          <Link className="navlink" href={"/profile"}>
            Profile
          </Link>
        </li>
        <li className="navliright">
          <Link className="navlink" href={"/wishlist"}>
            Wishlist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// Brand(home) /clothing, wishilist, cart, profile, about, no user? : login/signup0.
