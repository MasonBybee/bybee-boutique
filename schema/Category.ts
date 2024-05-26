import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { images } from "./Image";
import { inventory } from "./Inventory";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const categoryRelations = relations(categories, ({ one, many }) => ({
  image: one(images, {
    fields: [categories.id],
    references: [images.categoryId],
  }),
  products: many(inventory),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
