import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  categoryId: integer("category_id").notNull(),
  categorySlug: text("category_slug").notNull(),
  price: doublePrecision("price").notNull(),
  originalPrice: doublePrecision("original_price").notNull(),
  discount: integer("discount").notNull().default(0),
  rating: doublePrecision("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  image: text("image").notNull(),
  currency: text("currency").notNull().default("ريال"),
  isBestSeller: boolean("is_best_seller").default(false),
  rank: integer("rank"),
  period: text("period"),
  isFlashSale: boolean("is_flash_sale").default(false),
  featured: boolean("featured").default(false),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
