import React from "react";
import styles from "./NavLink.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface Props {
  href: string;
  icon?: IconProp;
  img?: string;
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  return (
    <div className={styles.container}>
      <Link href={props.href} className={styles.button}>
        <div className={styles.backgroundHex}>
          <div className={styles.hex}>
            {props.icon ? (
              <FontAwesomeIcon className={styles.icon} icon={props.icon} />
            ) : (
              <img src={props.img} className={styles.img}></img>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavLink;
