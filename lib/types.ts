import { Image } from "./schema/Image";

export interface CategoryWithImage {
  id: number;
  name: string;
  description: string;
  image: Image;
}

export interface InventoryWithImages {
  id: number;
  name: string;
  description: string;
  stock: number;
  unitPrice: string;
  categoryId: number;
  images: Image[];
}

export interface CategoryWithProduct {
  id: number;
  name: string;
  description: string;
  products: InventoryWithImages[];
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

export interface ProfileValues {
  firstName: string;
  lastName: string;
  email: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  checkPassword?: string;
  submit?: string;
}

export interface CheckoutFormErrors {
  addressLineOne?: string;
  addressLineTwo?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  cardNumber?: string;
  fullName?: string;
  expirationDate?: string;
  securityCode?: string;
}

export interface FormResponse {
  success: boolean;
  errors?: FormErrors;
}

export interface UpdatePassword {
  password: string;
  checkPassword: string;
}

export interface orderItemsWithProductImages {
  id: number;
  orderId: number;
  inventoryId: number;
  price: string;
  quantity: number;
  product: InventoryWithImages;
}

export interface OrderValues {
  id: number;
  userId: number;
  subtotal: string;
  discount: string;
  tax: string;
  status: string;
  orderDate: string;
  items: orderItemsWithProductImages[];
}

export interface ConvertToInventoryWithImagesInput {
  inventoryId: number;
  inventoryName: string;
  inventoryDescription: string;
  inventoryStock: number;
  inventoryUnitPrice: string;
  inventoryCategoryId: number;
  imageId: number | null;
  imageUrl: string | null;
  imageDescription: string | null;
  imageInventoryId: number | null;
  imageCategoryId: number | null;
}

export interface ConvertedProductResponse {
  success?: boolean;
  error?: string;
  data: InventoryWithImages[];
}

export interface CartItemWithImage {
  id: number;
  cartId: number;
  quantity: number;
  product: InventoryWithImages;
}

export interface AddressAndPaymentFormData {
  addressLineOne: string;
  addressLineTwo: string;
  zipCode: string;
  city: string;
  state: string;
  cardNumber: string;
  fullName: string;
  expirationDate: string;
  securityCode: string;
}
