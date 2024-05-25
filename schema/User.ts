import { pgTable, serial, text, boolean, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  username: varchar("username", { length: 30 }).notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  admin: boolean("admin").default(false).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
