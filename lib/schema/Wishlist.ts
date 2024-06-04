import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { users } from "./User";
import { relations } from "drizzle-orm";
import { wishlistItems } from "./WishlistItems";

export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export const wishlistRelations = relations(wishlists, ({ one, many }) => ({
  items: many(wishlistItems),
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
}));

export type Wishlist = typeof wishlists.$inferSelect;
export type NewWishlist = typeof wishlists.$inferInsert;
