import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, categoriesTable, productsTable, reviewsTable } from "@workspace/db";
import {
  HealthCheckResponse,
  ListCategoriesResponse,
  ListProductsResponse,
  GetProductParams,
  GetProductResponse,
  ListFlashSaleProductsResponse,
  ListBestSellersResponse,
  ListReviewsResponse,
  GetStoreStatsResponse,
  ListProductsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/categories", async (req, res): Promise<void> => {
  const categories = await db.select().from(categoriesTable).orderBy(categoriesTable.id);
  res.json(ListCategoriesResponse.parse(categories));
});

router.get("/products/flash-sales", async (req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isFlashSale, true))
    .limit(8);

  // Flash sale ends in ~2 days
  const endsAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000 + 42 * 1000);

  res.json(ListFlashSaleProductsResponse.parse({ products, endsAt: endsAt.toISOString() }));
});

router.get("/products/best-sellers", async (req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isBestSeller, true))
    .orderBy(productsTable.rank)
    .limit(8);
  res.json(ListBestSellersResponse.parse(products));
});

router.get("/products", async (req, res): Promise<void> => {
  const query = ListProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let dbQuery = db.select().from(productsTable).$dynamic();

  if (query.data.categoryId != null) {
    dbQuery = dbQuery.where(eq(productsTable.categoryId, query.data.categoryId));
  }

  if (query.data.featured != null) {
    dbQuery = dbQuery.where(eq(productsTable.featured, query.data.featured));
  }

  if (query.data.limit != null) {
    dbQuery = dbQuery.limit(query.data.limit);
  }

  const products = await dbQuery;
  res.json(ListProductsResponse.parse(products));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProductParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

router.get("/reviews", async (req, res): Promise<void> => {
  const reviews = await db.select().from(reviewsTable).orderBy(reviewsTable.id).limit(6);
  res.json(ListReviewsResponse.parse(reviews));
});

router.get("/stats", async (_req, res): Promise<void> => {
  res.json(
    GetStoreStatsResponse.parse({
      customers: "+50K",
      orders: "+10K",
      products: "+200",
      supportHours: "24/7",
    })
  );
});

export default router;
