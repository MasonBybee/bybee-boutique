import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./User";
import { inventory } from "./Inventory";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  inventoryId: integer("inventory_id").references(() => inventory.id),
  rating: integer("rating").notNull(),
  comment: varchar("comment", { length: 240 }).notNull(),
  reviewDate: timestamp("review_date", { withTimezone: true }).notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
