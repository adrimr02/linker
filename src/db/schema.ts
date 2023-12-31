import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  text
} from "drizzle-orm/mysql-core"
import type { AdapterAccount } from "@auth/core/adapters"
import { relations } from "drizzle-orm"

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 255 }),
})

export const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export const links = mysqlTable('links', {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  url: varchar("url", { length: 3000 }).notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  shortUrl: varchar("shortUrl", { length: 12 }).notNull(),
  visits: int("visits").notNull().default(0),
})

export const userRelations = relations(users, ({ many }) => ({
  links: many(links),
  accounts: many(accounts),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const linkRelations = relations(links, ({ one }) => ({
  user: one(users, {
    fields: [links.userId],
    references: [users.id],
  })
}))