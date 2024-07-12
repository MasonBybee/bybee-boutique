"use client";
import { useEffect, useState, useTransition } from "react";
import styles from "./page.module.css";
import MyAccount from "@/components/Profile/MyAccount";
import EditProfile from "@/components/Profile/EditProfile";
import EditPassword from "@/components/Profile/EditPassword";
import Orders from "@/components/Profile/Orders";
import Addresses from "@/components/Profile/Addresses";
import Wishlist from "@/components/Profile/Wishlist";
import Loading from "@/components/Loading";
import { getSession } from "@/actions/session";
import { ExtendedSession } from "@/lib/session";
import { useSearchParams } from "next/navigation";
import { getWishlist, getWishlistProducts } from "@/actions/wishlistActions";
import { WishlistItems } from "@/lib/schema/WishlistItems";
import { InventoryWithImages } from "@/lib/types";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [wishlist, setWishlist] = useState<WishlistItems[] | []>([]);
  const [wishlistProducts, setWishlistProducts] = useState<
    InventoryWithImages[] | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<ExtendedSession | null>(null);
  const [triggerEffect, setTriggerEffect] = useState(false);

  const searchParams = useSearchParams();
  const defaultSection = searchParams.get("section");

  useEffect(() => {
    if (defaultSection) {
      setActiveTab(defaultSection as string);
    }
    startTransition(() => {
      getSession(true).then((userSession) => {
        setUser(userSession as ExtendedSession);
      });
    });

    setTriggerEffect(false);
  }, [triggerEffect]);
  const handleTabChange = (e: any) => {
    setActiveTab(e.target.name);
  };

  useEffect(() => {
    startTransition(() => {
      if (user && user.isLoggedIn && user.wishlistId) {
        getWishlist(user.wishlistId).then((resp) => {
          if (resp.success && resp.data) {
            setWishlist(resp.data);
            getWishlistProducts(resp.data).then((response) => {
              if (response.success && response.data) {
                setWishlistProducts(response.data);
              }
            });
          }
        });
      }
    });
  }, [user]);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className={styles.AccountContainer}>
      <div className={styles.navigationList}>
        <button
          name="account"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "account" ? styles.active : ""
          }`}
        >
          My Account
        </button>
        <button
          name="profile"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "profile" ? styles.active : ""
          }`}
        >
          Profile
        </button>
        <button
          name="password"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "password" ? styles.active : ""
          }`}
        >
          Password
        </button>
        <button
          name="orders"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "orders" ? styles.active : ""
          }`}
        >
          My Orders
        </button>
        {/* <button
          name="addresses"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "addresses" ? styles.active : ""
          }`}
        >
          Address Book
        </button> */}
        <button
          name="wishlist"
          onClick={handleTabChange}
          className={`${styles.ButtonLink} ${
            activeTab === "wishlist" ? styles.active : ""
          }`}
        >
          Wishlist
        </button>
      </div>
      <div className={styles.AccountPage}>
        {activeTab === "account" && (
          <MyAccount
            isPending={isPending}
            user={user}
            setActive={setActiveTab}
          />
        )}
        {activeTab === "profile" && (
          <EditProfile setTriggerEffect={setTriggerEffect} user={user} />
        )}
        {activeTab === "password" && <EditPassword />}
        {activeTab === "orders" && user && <Orders user={user} />}
        {activeTab === "addresses" && <Addresses />}
        {activeTab === "wishlist" && (
          <Wishlist
            wishlistId={user?.wishlistId!}
            wishlist={wishlist}
            products={wishlistProducts!}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
