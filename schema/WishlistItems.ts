import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { wishlists } from "./Wishlist";
import { inventory } from "./Inventory";

export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  wishlistId: integer("wishlist_id")
    .references(() => wishlists.id)
    .notNull(),
  inventoryId: integer("inventory_id")
    .references(() => inventory.id)
    .notNull(),
});

export type Category = typeof wishlistItems.$inferSelect;
export type NewCategory = typeof wishlistItems.$inferInsert;
