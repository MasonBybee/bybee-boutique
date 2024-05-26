import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./User";
import { inventory } from "./Inventory";
import { relations } from "drizzle-orm";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  inventoryId: integer("inventory_id").references(() => inventory.id),
  rating: integer("rating").notNull(),
  comment: varchar("comment", { length: 240 }).notNull(),
  reviewDate: text("review_date").notNull(),
});

export const reviewRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(inventory, {
    fields: [reviews.inventoryId],
    references: [inventory.id],
  }),
}));

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
