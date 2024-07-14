"use server";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      {/* <div className={styles.footerContent}>
        <h3>Helpful Links</h3>
        <ul></ul>
      </div> */}
      {/* <div className={styles.footerContent}>
        <h3>About Us</h3>
        <ul>
          <a href="https://www.MasonBybee.com">MasonBybee.com</a>
        </ul>
      </div> */}
      <div className={styles.footerContent}>
        <h3 style={{ paddingBottom: "20px" }}>My Account</h3>
        <ul>
          <li style={{ listStyle: "none", paddingBottom: "20px" }}>
            <a href="/profile">Profile</a>
          </li>
          <li style={{ listStyle: "none", paddingBottom: "20px" }}>
            <a href="/profile">Cart</a>
          </li>
          <li style={{ listStyle: "none", paddingBottom: "20px" }}>
            <a href="/profile">Wishlist</a>
          </li>
        </ul>
      </div>
      <div className={styles.footerContent}>
        <h3 style={{ paddingBottom: "20px" }}>Contact Us</h3>
        <ul>
          <li style={{ listStyle: "none" }}>
            <a href="https://www.MasonBybee.com">MasonBybee.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
