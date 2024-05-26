import { relations } from "drizzle-orm";
import { pgTable, serial, text, boolean, varchar } from "drizzle-orm/pg-core";
import { carts } from "./Cart";
import { wishlists } from "./Wishlist";
import { reviews } from "./Review";
import { orders } from "./Order";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  password: text("password").notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  admin: boolean("admin").default(false).notNull(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  cart: one(carts, {
    fields: [users.id],
    references: [carts.userId],
  }),
  wishlist: one(wishlists, {
    fields: [users.id],
    references: [wishlists.userId],
  }),
  reviews: many(reviews),
  orders: many(orders),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
