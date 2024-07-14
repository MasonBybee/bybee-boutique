"use client";
import React, { useState, useTransition } from "react";
import styles from "./CheckoutForm.module.css";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { CartItemWithImage, CheckoutFormErrors } from "@/lib/types";
import { ExtendedSession } from "@/lib/session";
import CartItem from "../CartItem";
import { calcTaxAndShipping, getQtyAndSubtotal } from "@/actions/helperActions";
import { completeOrder } from "@/actions/orderActions";

const CheckoutForm = ({
  cart,
  session,
}: {
  cart: CartItemWithImage[];
  session: ExtendedSession | { [key: string]: any };
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [numOfItems, subtotal] = getQtyAndSubtotal(cart);
  const [shipping, tax, total] = calcTaxAndShipping(numOfItems, subtotal);
  const [formData, setFormData] = useState({
    addressLineOne: "",
    addressLineTwo: "",
    zipCode: "",
    city: "",
    state: "",
    cardNumber: "",
    fullName: "",
    expirationDate: "",
    securityCode: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    startTransition(() => {
      completeOrder(formData).then((resp) => {
        if (resp.success) {
          router.push("/");
        } else if (resp.errors) {
          setErrors(resp.errors);
        }
      });
    });
  };
  if (isPending) {
    return <Loading />;
  }
  return (
    <form action={onSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.leftSideContainer}>
          <div className={styles.addressContainer}>
            <h2>Address</h2>
            <div className={styles.inputWrapper}>
              <input
                name="addressLineOne"
                type="text"
                id="addressLineOne"
                className={`${styles.formInput} ${styles.addressLineInputs}`}
                placeholder="Adress Line 1"
                autoComplete="address-line1"
                value={formData.addressLineOne}
                onChange={handleChange}
              />
              <label htmlFor="addressLineOne" className={styles.formLabel}>
                Address Line 1
              </label>
              {errors.addressLineOne && (
                <p className={styles.error}>{errors.addressLineOne}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="addressLineTwo"
                type="text"
                id="addressLineTwo"
                className={`${styles.formInput} ${styles.addressLineInputs}`}
                placeholder="Address Line 2"
                autoComplete="address-line2"
                value={formData.addressLineTwo}
                onChange={handleChange}
              />
              <label htmlFor="addressLineTwo" className={styles.formLabel}>
                Address Line 2
              </label>
              {errors.addressLineTwo && (
                <p className={styles.error}>{errors.addressLineTwo}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="zipCode"
                type="text"
                id="zipCode"
                className={`${styles.formInput} ${styles.zipCodeInput}`}
                placeholder="Zip Code"
                autoComplete="zipcode"
                value={formData.zipCode}
                onChange={handleChange}
              />
              <label htmlFor="zipCode" className={styles.formLabel}>
                Zip Code
              </label>
              {errors.zipCode && (
                <p className={styles.error}>{errors.zipCode}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="city"
                type="text"
                id="city"
                className={`${styles.formInput} ${styles.cityInput}`}
                placeholder="City"
                autoComplete="city"
                value={formData.city}
                onChange={handleChange}
              />
              <label htmlFor="city" className={styles.formLabel}>
                City
              </label>
              {errors.city && <p className={styles.error}>{errors.city}</p>}
            </div>
            <div className={styles.inputWrapper}>
              <input
                maxLength={2}
                name="state"
                type="text"
                id="state"
                className={`${styles.formInput} ${styles.stateInput}`}
                placeholder="State Code"
                autoComplete="state"
                value={formData.state}
                onChange={handleChange}
              />
              <label htmlFor="state" className={styles.formLabel}>
                State Code
              </label>
              {errors.state && <p className={styles.error}>{errors.state}</p>}
            </div>
          </div>
          <div className={styles.paymentContainer}>
            <h2>Payment Method</h2>
            <div className={styles.inputWrapper}>
              <input
                maxLength={16}
                minLength={16}
                name="cardNumber"
                type="number"
                id="cardNumber"
                className={`${styles.formInput} ${styles.cardNumberInput}`}
                placeholder="Card Number"
                autoComplete="cardnumber"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <label htmlFor="cardNumber" className={styles.formLabel}>
                Card Number
              </label>
              {errors.cardNumber && (
                <p className={styles.error}>{errors.cardNumber}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="fullName"
                type="text"
                id="fullName"
                className={`${styles.formInput} ${styles.fullNameInput}`}
                placeholder="Full Name On Card"
                autoComplete="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <label htmlFor="fullName" className={styles.formLabel}>
                Full Name On Card
              </label>
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="expirationDate"
                type="text"
                id="expirationDate"
                className={`${styles.formInput} ${styles.expirationDateInput}`}
                placeholder="Expiration Date"
                autoComplete="expirationdate"
                value={formData.expirationDate}
                onChange={handleChange}
              />
              <label htmlFor="expirationDate" className={styles.formLabel}>
                Expiration Date
              </label>
              {errors.expirationDate && (
                <p className={styles.error}>{errors.expirationDate}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <input
                name="securityCode"
                type="text"
                id="securityCode"
                className={`${styles.formInput} ${styles.securityCodeInput}`}
                placeholder="Security Code"
                autoComplete="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
              />
              <label htmlFor="securityCode" className={styles.formLabel}>
                Security Code
              </label>
              {errors.securityCode && (
                <p className={styles.error}>{errors.securityCode}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.cartSection}>
          <h2>Items in Cart</h2>
          <div className={styles.cartContainer}>
            {cart.map((cartItem, index) => {
              return (
                <CartItem
                  key={index}
                  wishlistId={session.wishlistId}
                  cartItem={cartItem}
                />
              );
            })}
            <div className={styles.subtotalContainer}>
              <p>
                Subtotal ({numOfItems} Item): <b>${subtotal}</b>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.placeOrderContainer}>
          <div className={styles.orderTotalBreakdownContainer}>
            <div className={styles.orderBreakdownSection}>
              <p className={styles.orderBreakdownFee}>Items:</p>
              <p className={styles.orderBreakdownPrice}>${subtotal}</p>
            </div>
            <div className={styles.orderBreakdownSection}>
              <p className={styles.orderBreakdownFee}>Shipping & handling:</p>
              <p className={styles.orderBreakdownPrice}>${shipping}</p>
            </div>
            <div className={styles.orderBreakdownSection}>
              <p className={styles.orderBreakdownFee}>Tax:</p>
              <p className={styles.orderBreakdownPrice}>${tax}</p>
            </div>
          </div>
          <div className={styles.orderBreakdownSection}>
            <h3 className={styles.orderBreakdownFee}>Order Total:</h3>
            <h3 className={styles.orderBreakdownPrice}>${total}</h3>
          </div>
          <div className={styles.checkoutButtonContainer}>
            <button type="submit" className={styles.checkoutButton}>
              Place your Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
