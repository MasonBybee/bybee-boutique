"use server";
import CategoryContainer from "@/components/CategoryContainer";
import styles from "./page.module.css";
import { getCategories } from "@/actions/categoryActions";

export default async function Home() {
  const categories = await getCategories();
  return (
    <>
      <div className={styles.welcomediv}>
        <h1 className={styles.welcomeh1}>Welcome to the Bybee Boutique</h1>
        <h3 className={styles.welcomeh3}>Buzz around and explore our hive!</h3>
        <p className={styles.disclaimer}>
          Disclaimer: This website is a proof of concept for my{" "}
          <a
            target="_blank"
            className={styles.link}
            href={"https://masonbybee.com"}
          >
            portfolio
          </a>
          , none of the products listed here are real.
        </p>
      </div>
      <CategoryContainer categories={categories} />
    </>
  );
}
