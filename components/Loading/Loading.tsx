"use client";
import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingDiv}>
        <img
          className={styles.loading}
          src="https://res.cloudinary.com/dabfhr2dr/image/upload/v1716914561/pixilart-drawing_1_bwxpss.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Loading;
