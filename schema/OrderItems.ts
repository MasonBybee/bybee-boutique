import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { orders } from "./Order";
import { inventory } from "./Inventory";
import { relations } from "drizzle-orm";

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  inventoryId: integer("inventory_id")
    .references(() => inventory.id)
    .notNull(),
  price: text("price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(inventory, {
    fields: [orderItems.inventoryId],
    references: [inventory.id],
  }),
}));

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
