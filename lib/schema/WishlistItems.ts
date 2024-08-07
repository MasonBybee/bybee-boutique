import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import { wishlists } from "./Wishlist";
import { inventory } from "./Inventory";
import { relations } from "drizzle-orm";

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: serial("id").primaryKey(),
    wishlistId: integer("wishlist_id")
      .references(() => wishlists.id)
      .notNull(),
    inventoryId: integer("inventory_id")
      .references(() => inventory.id)
      .notNull(),
  },
  (t) => ({
    unq: unique().on(t.wishlistId, t.inventoryId),
    unq2: unique("wishlistInventory").on(t.wishlistId, t.inventoryId),
  })
);

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

export type WishlistItems = typeof wishlistItems.$inferSelect;
export type NewWishlistItem = typeof wishlistItems.$inferInsert;
