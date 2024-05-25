import {
  pgTable,
  serial,
  text,
  integer,
  decimal,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./User";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  subtotal: decimal("subtotal").notNull(),
  discount: decimal("discount").notNull(),
  tax: decimal("tax").notNull(),
  status: text("status").notNull(),
  orderDate: timestamp("order_date", { withTimezone: true }),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
