export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  admin: boolean;
}
export interface Image {
  id: number;
  description: string;
  image: string;
  categoryId: null | number;
  inventoryId: null | number;
}

export interface CategoryWithImage {
  id: number;
  name: string;
  description: string;
  image: Image;
}
