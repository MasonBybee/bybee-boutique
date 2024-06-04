import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { users } from "./User";
import { relations } from "drizzle-orm";
import { orderItems } from "./OrderItems";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  subtotal: text("subtotal").notNull(),
  discount: text("discount").notNull(),
  tax: text("tax").notNull(),
  status: text("status").notNull(),
  orderDate: text("order_date").notNull(),
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
