/**
 * Sa7 - Supabase Client for Frontend
 * Connects to real scraped data in Supabase
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Types matching Supabase schema ──────────────────────────────
export interface SupaProduct {
  id: string;
  name_ar: string;
  name_en: string | null;
  brand: string | null;
  unit: string | null;
  barcode: string | null;
  image_url: string | null;
  category_id: string | null;
  created_at: string;
}

export interface SupaPrice {
  id: string;
  product_id: string;
  store_id: string;
  price: number;
  original_price: number | null;
  in_stock: boolean;
  url: string | null;
  scraped_at: string;
}

export interface SupaDeal {
  id: string;
  product_id: string;
  store_id: string;
  deal_type: string | null;
  discount_percent: number | null;
  original_price: number | null;
  deal_price: number;
  starts_at: string | null;
  ends_at: string | null;
  badge: string | null;
  active: boolean;
}

// ── Data fetching functions ─────────────────────────────────────

/** Get all products with their latest prices */
export async function getProductsWithPrices(limit = 50) {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(limit);

  if (error || !products) return [];

  // Get latest prices for all products
  const productIds = products.map((p) => p.id);
  const { data: prices } = await supabase
    .from("prices")
    .select("*")
    .in("product_id", productIds)
    .order("scraped_at", { ascending: false });

  return products.map((product) => ({
    ...product,
    prices: (prices || []).filter((p) => p.product_id === product.id),
  }));
}

/** Get active deals */
export async function getActiveDeals(limit = 20) {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("active", true)
    .order("discount_percent", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

/** Get deals with product details */
export async function getDealsWithProducts(limit = 20) {
  const deals = await getActiveDeals(limit);
  if (deals.length === 0) return [];

  const productIds = deals.map((d) => d.product_id);
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  return deals.map((deal) => ({
    ...deal,
    product: (products || []).find((p) => p.id === deal.product_id),
  }));
}

/** Get products by search query */
export async function searchProducts(query: string, limit = 20) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name_ar.ilike.%${query}%,name_en.ilike.%${query}%,brand.ilike.%${query}%`)
    .limit(limit);

  if (error) return [];
  return data || [];
}

/** Get price history for a product */
export async function getPriceHistory(productId: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("product_id", productId)
    .gte("scraped_at", since.toISOString())
    .order("scraped_at", { ascending: true });

  if (error) return [];
  return data || [];
}

/** Get cheapest prices across stores for a product */
export async function getCheapestPrices(productId: string) {
  const { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("product_id", productId)
    .order("price", { ascending: true });

  if (error) return [];

  // Deduplicate by store (keep cheapest per store)
  const byStore = new Map<string, SupaPrice>();
  for (const price of data || []) {
    if (!byStore.has(price.store_id) || price.price < byStore.get(price.store_id)!.price) {
      byStore.set(price.store_id, price);
    }
  }
  return Array.from(byStore.values()).sort((a, b) => a.price - b.price);
}

/** Get Ramadan essentials - products in key categories */
export async function getRamadanProducts() {
  // Fetch all products (we only have ~208 from Carrefour)
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(300);

  if (error || !products) return [];

  // Get all latest prices
  const productIds = products.map((p) => p.id);
  const { data: prices } = await supabase
    .from("prices")
    .select("*")
    .in("product_id", productIds)
    .order("scraped_at", { ascending: false });

  // Get active deals
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .eq("active", true);

  return products.map((product) => {
    const productPrices = (prices || []).filter((p) => p.product_id === product.id);
    const productDeal = (deals || []).find((d) => d.product_id === product.id);
    const lowestPrice = productPrices.length > 0
      ? Math.min(...productPrices.map((p) => p.price))
      : null;

    return {
      ...product,
      prices: productPrices,
      deal: productDeal || null,
      lowestPrice,
    };
  });
}

/** Get stats for the site */
export async function getSiteStats() {
  const [productsRes, pricesRes, dealsRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("prices").select("id", { count: "exact", head: true }),
    supabase.from("deals").select("id", { count: "exact", head: true }).eq("active", true),
  ]);

  return {
    totalProducts: productsRes.count || 0,
    totalPrices: pricesRes.count || 0,
    activeDeals: dealsRes.count || 0,
  };
}
