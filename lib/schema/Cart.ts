import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { users } from "./User";
import { relations } from "drizzle-orm";
import { cartItems } from "./CartItems";

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .unique(),
});

export const cartRelations = relations(carts, ({ one, many }) => ({
  items: many(cartItems),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;
