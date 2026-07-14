import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  titleAr: text("title_ar").notNull(),
  slug: text("slug").notNull().unique(),
  excerptAr: text("excerpt_ar").notNull(),
  contentAr: text("content_ar").notNull(),
  coverImage: text("cover_image").notNull(),
  authorName: text("author_name").notNull(),
  authorAvatar: text("author_avatar"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  readingMins: integer("reading_mins").notNull().default(3),
  tag: text("tag").notNull(),
  views: integer("views").notNull().default(0),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({ id: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
