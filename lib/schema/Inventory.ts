import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { categories } from "./Category";
import { relations } from "drizzle-orm";
import { images } from "./Image";

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  stock: integer("stock").notNull(),
  unitPrice: text("unit_price").notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
});

export const inventoryRelations = relations(inventory, ({ one, many }) => ({
  images: many(images),
}));

export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
