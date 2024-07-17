import Link from "next/link";
import React from "react";
import styles from "./MyAccount.module.css";
import LogoutBtn from "@/components/LogoutBtn";

const MyAccount = ({ setActive, user, isPending }: any) => {
  if (!user) {
    return <></>;
  }
  return (
    <>
      <section>
        <div className={styles.SectionHeader}>
          <h2 className={`${styles.SectionElement} ${styles.SectionTitle}`}>
            Profile
          </h2>
          <button
            className={`${styles.SectionElement} ${styles.editButton}`}
            onClick={() => setActive("profile")}
          >
            Edit
          </button>
        </div>
        <h3 className={styles.fieldName}>First Name</h3>
        <p>{user.firstName}</p>
        <h3 className={styles.fieldName}>Last Name</h3>
        <p>{user.lastName}</p>
        <h3 className={styles.fieldName}>Email</h3>
        <p>{user.email}</p>
      </section>
      <section>
        <div className={styles.SectionHeader}>
          <h2 className={styles.SectionTitle}>Password</h2>
          <button
            className={`${styles.SectionElement} ${styles.editButton}`}
            onClick={() => setActive("password")}
          >
            Edit
          </button>
        </div>
        <p style={{ marginTop: "20px" }}>*********</p>
      </section>
      <section>
        <div className={styles.SectionHeader}>
          <h2 className={styles.SectionTitle}>Logout</h2>
        </div>
        <LogoutBtn />
      </section>
    </>
  );
};

export default MyAccount;
