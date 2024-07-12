import React from "react";
import styles from "./CategoryContainer.module.css";
import CategoryCard from "../CategoryCard";
import { CategoryWithImage } from "@/lib/types";

interface CategoryContainerProps {
  categories: CategoryWithImage[];
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({
  categories,
}) => {
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.categoryContainerH2}>Categories</h2>
      <div className={styles.categories}>
        {categories.map((category: CategoryWithImage) => {
          return (
            <CategoryCard
              key={category.id}
              name={category.name}
              img={category.image.image}
              imgDesc={category.image.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryContainer;
