// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

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

export const users = createTable("user", (d) => ({
  id: d.uuid("id").primaryKey(),
  likes: d.jsonb("likes"),
  tasteProfile: d.text("taste_profile"),
  createdAt: d.timestamp("created_at").notNull().defaultNow(),
}));

export const likes = createTable("like", (d) => ({
  id: d.uuid("id").primaryKey(),
  userId: d.uuid("userId").references(() => users.id),
  imageId: d.uuid("imageId").references(() => imageProfiles.id),
  isLiked: d.boolean("is_liked").notNull(),
  createdAt: d.timestamp("created_at").notNull().defaultNow(),
}));
