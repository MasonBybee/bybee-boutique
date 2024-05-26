import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import "dotenv/config";
import { cartRelations, carts } from "@/schema/Cart";
import { cartItemRelations, cartItems } from "@/schema/CartItems";
import { categories, categoryRelations } from "@/schema/Category";
import { imageRelations, images } from "@/schema/Image";
import { inventory, inventoryRelations } from "@/schema/Inventory";
import { orderRelations, orders } from "@/schema/Order";
import { orderItemRelations, orderItems } from "@/schema/OrderItems";
import { reviewRelations, reviews } from "@/schema/Review";
import { userRelations, users } from "@/schema/User";
import { wishlistRelations, wishlists } from "@/schema/Wishlist";
import { wishlistItemRelations, wishlistItems } from "@/schema/WishlistItems";

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
