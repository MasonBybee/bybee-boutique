import { pgTable, serial, integer, decimal } from "drizzle-orm/pg-core";
import { orders } from "./Order";
import { inventory } from "./Inventory";

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  inventoryId: integer("inventory_id")
    .references(() => inventory.id)
    .notNull(),
  price: decimal("price").notNull(),
  quantity: integer("quantity").notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
