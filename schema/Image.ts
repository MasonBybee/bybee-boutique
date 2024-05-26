import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { inventory } from "./Inventory";
import { categories } from "./Category";
import { relations } from "drizzle-orm";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  inventoryId: integer("inventory_id").references(() => inventory.id),
  categoryId: integer("category_id").references(() => categories.id),
});

export const imageRelations = relations(images, ({ one }) => ({
  product: one(inventory, {
    fields: [images.inventoryId],
    references: [inventory.id],
  }),
  category: one(categories, {
    fields: [images.categoryId],
    references: [categories.id],
  }),
}));

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;
