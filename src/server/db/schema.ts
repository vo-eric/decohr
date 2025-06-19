// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `decohr_${name}`);

export const imageProfiles = createTable("image_profile", (d) => ({
  id: d.uuid("id").primaryKey(),
  imageUrl: d.text("image_url").notNull(),
  styles: d.jsonb("styles").notNull(),
  createdAt: d.timestamp("created_at").notNull().defaultNow(),
  updatedAt: d.timestamp("updated_at").notNull().defaultNow(),
  reasoning: d.text("reasoning"),
}));

export const likes = createTable("like", (d) => ({
  id: d.uuid("id").primaryKey(),
  userId: d.text("user_id").references(() => user.id),
  imageId: d.uuid("imageId").references(() => imageProfiles.id),
  isLiked: d.boolean("is_liked").notNull(),
  createdAt: d.timestamp("created_at").notNull().defaultNow(),
}));

export const generatedImages = createTable("generated_image", (d) => ({
  id: d.uuid("id").primaryKey(),
  imageUrl: d.text("image_url").notNull(),
  userId: d.text("user_id").references(() => user.id),
  createdAt: d.timestamp("created_at").notNull().defaultNow(),
}));

export const user = createTable("user", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  emailVerified: d
    .boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: d.text("image"),
  createdAt: d
    .timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: d
    .timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  likes: d.jsonb("likes"),
  tasteProfile: d.text("taste_profile"),
}));

export const session = createTable("session", (d) => ({
  id: d.text("id").primaryKey(),
  expiresAt: d.timestamp("expires_at").notNull(),
  token: d.text("token").notNull().unique(),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
  ipAddress: d.text("ip_address"),
  userAgent: d.text("user_agent"),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const account = createTable("account", (d) => ({
  id: d.text("id").primaryKey(),
  accountId: d.text("account_id").notNull(),
  providerId: d.text("provider_id").notNull(),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.text("access_token"),
  refreshToken: d.text("refresh_token"),
  idToken: d.text("id_token"),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
  scope: d.text("scope"),
  password: d.text("password"),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
}));

export const verification = createTable("verification", (d) => ({
  id: d.text("id").primaryKey(),
  identifier: d.text("identifier").notNull(),
  value: d.text("value").notNull(),
  expiresAt: d.timestamp("expires_at").notNull(),
  createdAt: d
    .timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: d
    .timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date()),
}));

export const schema = { user, session, account, verification };
