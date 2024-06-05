import React, { useState } from "react";
import styles from "./ProfileBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoginSignUpCard from "../LoginSignUpCard";

const ProfileBtn: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    console.log("clicked");
    setVisible(!visible);
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
      {visible && <LoginSignUpCard toggle={handleClick} />}
    </div>
  );
};

export default ProfileBtn;
