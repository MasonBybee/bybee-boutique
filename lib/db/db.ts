import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import "dotenv/config";
import { cartRelations, carts } from "@/lib/schema/Cart";
import { cartItemRelations, cartItems } from "@/lib/schema/CartItems";
import { categories, categoryRelations } from "@/lib/schema/Category";
import { imageRelations, images } from "@/lib/schema/Image";
import { inventory, inventoryRelations } from "@/lib/schema/Inventory";
import { orderRelations, orders } from "@/lib/schema/Order";
import { orderItemRelations, orderItems } from "@/lib/schema/OrderItems";
import { reviewRelations, reviews } from "@/lib/schema/Review";
import { userRelations, users } from "@/lib/schema/User";
import { wishlistRelations, wishlists } from "@/lib/schema/Wishlist";
import {
  wishlistItemRelations,
  wishlistItems,
} from "@/lib/schema/WishlistItems";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const schema = {
  carts,
  cartItems,
  categories,
  images,
  inventory,
  orders,
  orderItems,
  reviews,
  users,
  wishlists,
  wishlistItems,
  cartRelations,
  cartItemRelations,
  categoryRelations,
  imageRelations,
  inventoryRelations,
  orderRelations,
  orderItemRelations,
  reviewRelations,
  userRelations,
  wishlistRelations,
  wishlistItemRelations,
};

const db = drizzle(client, { schema });
export default db;
