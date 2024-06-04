"use client";

import CustomError from "@/lib/CustomError";
import React, { useEffect, useState } from "react";
import styles from "./CategoryContainer.module.css";
import Loading from "../Loading";
import CategoryCard from "../CategoryCard";

type DataState = null | any;

interface Image {
  id: number;
  description: string;
  image: string;
  categoryId: number;
  inventoryId: null | number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: Image;
}

const CategoryContainer = () => {
  const [data, setData] = useState<DataState>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new CustomError(400, "Failed to fetch Categories");
        }
        setData(await response.json());
      } catch (e) {
        if (e instanceof CustomError) {
          console.error(e.status, e.message);
          setData(null);
        }
      }
    };

    fetchData();
  }, []);

  if (data === null) {
    return <Loading />;
  }
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.categoryContainerH2}>Categories</h2>
      <div className={styles.categories}>
        {data.map((category: Category) => {
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
