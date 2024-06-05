"use client";
import React, { useEffect, useState, useTransition } from "react";
import { getCategory } from "@/actions/categoryActions";
import Loading from "@/components/Loading";
import { CategoryWithProduct } from "@/lib/types";

const CategoryPage = ({ params }: { params: { categoryName: string } }) => {
  const [isPending, startTransition] = useTransition();
  const [category, setCategory] = useState<CategoryWithProduct>();
  useEffect(() => {
    startTransition(() => {
      getCategory(params.categoryName).then((category) => {
        setCategory(category as CategoryWithProduct);
      });
    });
  }, []);
  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1>{category?.name}</h1>
        <ul>
          {category?.product.map((p) => {
            return <li>{p.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default CategoryPage;
