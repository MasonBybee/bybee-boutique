import {
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
