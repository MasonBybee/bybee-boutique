import React, { useState } from "react";

import styles from "./ProfileBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoginSignUpCard from "../LoginSignUpCard";

const ProfileBtn = () => {
  const [visable, setVisable] = useState(false);
  const handleClick = () => {
    setVisable(visable ? false : true);
  };
  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.button}>
        <div className={styles.backgroundHex}>
          <div className={styles.hex}>
            <FontAwesomeIcon className={styles.icon} icon={faUser} />
          </div>
        </div>
      </button>
      {visable ? <LoginSignUpCard /> : ""}
    </div>
  );
};

export default ProfileBtn;
