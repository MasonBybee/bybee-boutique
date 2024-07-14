import {
  AddressAndPaymentFormData,
  CheckoutFormErrors,
  FormErrors,
  ProfileValues,
  SignUpFormValues,
  UpdatePassword,
} from "@/lib/types";

export const signUpFormValidator = (data: SignUpFormValues) => {
  const errors: FormErrors = {};
  if (!data.firstName || !(data.firstName.length >= 3)) {
    errors.firstName = "First name must be at least 3 characters long";
  }
  if (!data.lastName || !(data.lastName.length >= 3)) {
    errors.lastName = "Last name must be at least 3 characters long";
  }
  if (!data.email || !(data.firstName.length >= 3)) {
    errors.email = "Email must be at least 6 characters long";
  } else if (
    data.email &&
    !data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  ) {
    errors.email = "Email must be a valid Email Address";
  }
  if (!data.username || !(data.username.length >= 5)) {
    errors.username = "Username must be at least 5 characters long";
  }

  if (!data.password || !(data.password.length >= 8)) {
    errors.password = "Password must be at least 8 characters";
  }

  if (data.password !== data.checkPassword) {
    errors.checkPassword = "Passwords must match";
  }

  return errors;
};

export const updateProfileValidator = (data: ProfileValues) => {
  const errors: FormErrors = {};
  if (!data.firstName || !(data.firstName.length >= 3)) {
    errors.firstName = "First name must be at least 3 characters long";
  }
  if (!data.lastName || !(data.lastName.length >= 3)) {
    errors.lastName = "Last name must be at least 3 characters long";
  }
  if (!data.email || !(data.firstName.length >= 3)) {
    errors.email = "Email must be at least 6 characters long";
  } else if (
    data.email &&
    !data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  ) {
    errors.email = "Email must be a valid Email Address";
  }
  return errors;
};

export const updatePasswordValidator = (data: UpdatePassword) => {
  const errors: FormErrors = {};
  if (data.password || !(data.password.length >= 8)) {
    errors.password = "Password must be at least 8 characters";
  }

  if (data.password !== data.checkPassword) {
    errors.checkPassword = "Passwords must match";
  }
  return errors;
};

export const addressAndPaymentFormValidator = (
  data: AddressAndPaymentFormData
) => {
  const errors: CheckoutFormErrors = {};

  if (!data.addressLineOne || data.addressLineOne.length < 5) {
    errors.addressLineOne =
      "Address Line One must be at least 5 characters long";
  }

  if (!data.zipCode || !/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
    errors.zipCode =
      "Zip Code must be a valid format (e.g., 12345 or 12345-6789)";
  }

  if (!data.city || data.city.length < 3) {
    errors.city = "City must be at least 3 characters long";
  }

  if (!data.state || data.state.length !== 2) {
    errors.state = "State must be a valid 2-character state code";
  }

  if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
    errors.cardNumber = "Card Number must be exactly 16 digits";
  }

  if (!data.fullName || data.fullName.length < 5) {
    errors.fullName = "Full Name must be at least 5 characters long";
  }

  if (
    !data.expirationDate ||
    !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expirationDate)
  ) {
    errors.expirationDate = "Expiration Date must be in MM/YY format";
  }

  if (!data.securityCode || !/^\d{3,4}$/.test(data.securityCode)) {
    errors.securityCode = "Security Code must be 3 or 4 digits";
  }

  return errors;
};
