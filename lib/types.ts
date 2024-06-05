import { Image } from "./schema/Image";
import { Inventory } from "./schema/Inventory";

export interface CategoryWithImage {
  id: number;
  name: string;
  description: string;
  image: Image;
}

export interface CategoryWithProduct {
  id: number;
  name: string;
  description: string;
  product: Inventory[];
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  checkPassword: string;
}

export interface LoginFormValues {
  username: string;
  password: string;
}
