import { Router, type IRouter } from "express";
import { eq, ilike, and, ne } from "drizzle-orm";
import { db, categoriesTable, productsTable, reviewsTable, blogPostsTable } from "@workspace/db";
import {
  ListCategoriesResponse,
  ListProductsResponse,
  ListProductsQueryParams,
  GetProductParams,
  GetProductResponse,
  GetRelatedProductsParams,
  GetRelatedProductsResponse,
  ListFlashSaleProductsResponse,
  ListBestSellersResponse,
  ListReviewsResponse,
  GetStoreStatsResponse,
  SearchProductsQueryParams,
  SearchProductsResponse,
  ListBlogPostsQueryParams,
  ListBlogPostsResponse,
  GetBlogPostParams,
  GetBlogPostResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// ── CATEGORIES ─────────────────────────────────────────────
router.get("/categories", async (_req, res): Promise<void> => {
  const rows = await db.select().from(categoriesTable).orderBy(categoriesTable.id);
  res.json(ListCategoriesResponse.parse(rows));
});

// ── FLASH SALES ────────────────────────────────────────────
router.get("/products/flash-sales", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isFlashSale, true))
    .limit(8);
  const endsAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000 + 42 * 1000);
  res.json(ListFlashSaleProductsResponse.parse({ products, endsAt: endsAt.toISOString() }));
});

// ── BEST SELLERS ───────────────────────────────────────────
router.get("/products/best-sellers", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isBestSeller, true))
    .orderBy(productsTable.rank)
    .limit(8);
  res.json(ListBestSellersResponse.parse(products));
});

// ── SEARCH ─────────────────────────────────────────────────
router.get("/products/search", async (req, res): Promise<void> => {
  const q = SearchProductsQueryParams.safeParse(req.query);
  if (!q.success) {
    res.status(400).json({ error: q.error.message });
    return;
  }
  const limit = q.data.limit ?? 10;
  const products = await db
    .select()
    .from(productsTable)
    .where(ilike(productsTable.nameAr, `%${q.data.q}%`))
    .limit(limit);
  res.json(SearchProductsResponse.parse(products));
});

// ── PRODUCTS LIST ──────────────────────────────────────────
router.get("/products", async (req, res): Promise<void> => {
  const query = ListProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const conditions = [];
  if (query.data.categoryId != null) conditions.push(eq(productsTable.categoryId, query.data.categoryId));
  if (query.data.categorySlug != null) conditions.push(eq(productsTable.categorySlug, query.data.categorySlug));
  if (query.data.featured != null) conditions.push(eq(productsTable.featured, query.data.featured));

  let rows = await db
    .select()
    .from(productsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(query.data.limit ?? 50);

  // Sort in JS for flexibility
  const sort = query.data.sort;
  if (sort === "price_asc") rows = rows.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") rows = rows.sort((a, b) => b.price - a.price);
  else if (sort === "rating") rows = rows.sort((a, b) => b.rating - a.rating);

  res.json(ListProductsResponse.parse(rows));
});

// ── PRODUCT DETAIL ─────────────────────────────────────────
router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProductParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, params.data.id));
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }
  res.json(GetProductResponse.parse(product));
});

// ── RELATED PRODUCTS ───────────────────────────────────────
router.get("/products/:id/related", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetRelatedProductsParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

  const [source] = await db.select().from(productsTable).where(eq(productsTable.id, params.data.id));
  if (!source) { res.json(GetRelatedProductsResponse.parse([])); return; }

  const related = await db
    .select()
    .from(productsTable)
    .where(and(eq(productsTable.categorySlug, source.categorySlug), ne(productsTable.id, source.id)))
    .limit(4);
  res.json(GetRelatedProductsResponse.parse(related));
});

// ── REVIEWS ────────────────────────────────────────────────
router.get("/reviews", async (_req, res): Promise<void> => {
  const reviews = await db.select().from(reviewsTable).orderBy(reviewsTable.id).limit(6);
  res.json(ListReviewsResponse.parse(reviews));
});

// ── STATS ──────────────────────────────────────────────────
router.get("/stats", async (_req, res): Promise<void> => {
  res.json(GetStoreStatsResponse.parse({ customers: "+50K", orders: "+10K", products: "+200", supportHours: "24/7" }));
});

// ── BLOG ───────────────────────────────────────────────────
router.get("/blog/posts", async (req, res): Promise<void> => {
  const q = ListBlogPostsQueryParams.safeParse(req.query);
  if (!q.success) { res.status(400).json({ error: q.error.message }); return; }

  let rows = await db.select().from(blogPostsTable).orderBy(blogPostsTable.publishedAt).limit(q.data.limit ?? 20);
  if (q.data.tag) rows = rows.filter(p => p.tag === q.data.tag);
  res.json(ListBlogPostsResponse.parse(rows));
});

router.get("/blog/posts/:slug", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const params = GetBlogPostParams.safeParse({ slug: raw });
  if (!params.success) { res.status(400).json({ error: params.error.message }); return; }

  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, params.data.slug));
  if (!post) { res.status(404).json({ error: "Post not found" }); return; }
  res.json(GetBlogPostResponse.parse(post));
});

export default router;
