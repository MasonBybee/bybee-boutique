"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import styles from "./ProductForm.module.css";
import { addCartItem } from "@/actions/cartActions";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

const initialFormState = {
  size: 1,
  qty: 1,
};

interface ProductFormProps {
  cartId: number;
  inventoryId: number;
  category: string;
}

interface ProductDataState {
  size: number;
  qty: number;
}

const ProductForm: React.FC<ProductFormProps> = ({
  cartId,
  inventoryId,
  category,
}) => {
  const [data, setData] = useState<ProductDataState>(initialFormState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    startTransition(() => {
      addCartItem(cartId, inventoryId, data.qty).then((response) => {
        if (response.success) {
          router.push(`/category/${category}`);
        }
      });
    });
  };
  return (
    <form action={handleSubmit}>
      <label className={styles.sizeLabel} htmlFor="size">
        Size:
      </label>
      <select onChange={handleChange} value={data.size} id="size" name="size">
        <option value="0">S</option>
        <option value="1">M</option>
        <option value="2">L</option>
        <option value="3">XL</option>
        <option value="4">XXL</option>
      </select>
      <br />
      <label htmlFor="qty" className={styles.qtyLabel}>
        QTY:
      </label>
      <input
        onChange={handleChange}
        value={data.qty}
        className={styles.qtyInput}
        type="number"
        name="qty"
        id="qty"
      />
      {isPending ? (
        <Loading />
      ) : (
        <button className={styles.addToCartButton}>Add To Cart</button>
      )}
    </form>
  );
};

export default ProductForm;
