"use server";
import { getCategory } from "@/actions/categoryActions";
import { Category } from "@/lib/schema/Category";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const category = (await getCategory(params.categoryName)) as Category;
  console.log(category);
  return (
    <>
      <div>
        <h1 className="hi">{category?.name}</h1>
        <ul>
          <p>{category.name}</p>
        </ul>
      </div>
    </>
  );
};

export default CategoryPage;
