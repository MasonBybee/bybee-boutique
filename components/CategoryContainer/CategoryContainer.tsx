"use client";
import React, { useEffect, useState, useTransition } from "react";
import styles from "./CategoryContainer.module.css";
import Loading from "../Loading";
import CategoryCard from "../CategoryCard";
import { getCategories } from "@/actions/categoryActions";
import { CategoryWithImage } from "@/lib/types";

const CategoryContainer: React.FC = () => {
  const [data, setData] = useState<CategoryWithImage[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getCategories().then((categories) => {
        setData(categories as CategoryWithImage[]);
      });
    });
  }, []);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.categoryContainerH2}>Categories</h2>
      <div className={styles.categories}>
        {data.map((category: CategoryWithImage) => {
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
