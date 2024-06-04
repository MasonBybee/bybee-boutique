"use client";

import CustomError from "@/lib/CustomError";
import React, { useEffect, useState } from "react";
import styles from "./CategoryContainer.module.css";
import Link from "next/link";
import Loading from "../Loading";

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
      <h2>Categories</h2>
      <div>
        {data.map((category: Category) => {
          return (
            <Link key={category.id} href={`/category/${category.name}`}>
              <div className={styles.category}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <img
                  className={styles.categoryImg}
                  src={category.image.image}
                  alt={category.image.description}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryContainer;
