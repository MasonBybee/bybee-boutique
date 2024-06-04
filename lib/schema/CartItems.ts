import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import { carts } from "./Cart";
import { inventory } from "./Inventory";
import { relations } from "drizzle-orm";

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartId: integer("cart_id")
      .references(() => carts.id)
      .notNull(),
    inventoryId: integer("inventory_id")
      .references(() => inventory.id)
      .notNull(),
    quantity: integer("quantity").notNull(),
  },
  (t) => ({
    unq: unique().on(t.cartId, t.inventoryId),
    unq2: unique("cartInventory").on(t.cartId, t.inventoryId),
  })
);

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(inventory, {
    fields: [cartItems.inventoryId],
    references: [inventory.id],
  }),
}));

export type Category = typeof cartItems.$inferSelect;
export type NewCategory = typeof cartItems.$inferInsert;
