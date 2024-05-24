import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { carts } from "./Cart";
import { inventory } from "./Inventory";

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .references(() => carts.id)
    .notNull(),
  inventoryId: integer("inventory_id")
    .references(() => inventory.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});

export type Category = typeof cartItems.$inferSelect;
export type NewCategory = typeof cartItems.$inferInsert;
