import { pgTable, serial, text, integer, decimal } from "drizzle-orm/pg-core";
import { categories } from "./Category";

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  stock: integer("stock").notNull(),
  unitPrice: decimal("unit_price").notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
});

export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
