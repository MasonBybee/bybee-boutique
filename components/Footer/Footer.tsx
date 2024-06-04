"use server";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <h3>Helpful Links</h3>
        <ul></ul>
      </div>
      <div className={styles.footerContent}>
        <h3>About Us</h3>
        <ul></ul>
      </div>
      <div className={styles.footerContent}>
        <h3>My Account</h3>
        <ul></ul>
      </div>
      <div className={styles.footerContent}>
        <h3>Contact Us</h3>
        <ul></ul>
      </div>
    </div>
  );
};

export default Footer;
