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
