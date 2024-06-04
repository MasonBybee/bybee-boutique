import React from "react";
import styles from "./CategoryCard.module.css";
import Link from "next/link";

interface Props {
  name: string;
  img: string;
  imgDesc: string;
}

const CategoryCard: React.FC<Props> = ({ name, img, imgDesc }) => {
  return (
    <Link href={`/category/${name}`}>
      <div className={styles.category}>
        <h3 className={styles.categoryName}>{name}</h3>
        <img className={styles.categoryImg} src={img} alt={imgDesc} />
      </div>
    </Link>
  );
};

export default CategoryCard;
