import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { wishlists } from "./Wishlist";
import { inventory } from "./Inventory";
import { relations } from "drizzle-orm";

export const wishlistItems = pgTable("wishlist_items", {
  id: serial("id").primaryKey(),
  wishlistId: integer("wishlist_id")
    .references(() => wishlists.id)
    .notNull(),
  inventoryId: integer("inventory_id")
    .references(() => inventory.id)
    .notNull(),
});

export const wishlistItemRelations = relations(wishlistItems, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [wishlistItems.wishlistId],
    references: [wishlists.id],
  }),
  product: one(inventory, {
    fields: [wishlistItems.inventoryId],
    references: [inventory.id],
  }),
}));

export type Category = typeof wishlistItems.$inferSelect;
export type NewCategory = typeof wishlistItems.$inferInsert;
