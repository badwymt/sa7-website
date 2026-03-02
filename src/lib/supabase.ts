import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getRamadanProducts() {
  const { data: products, error } = await supabase.from("products").select("*").limit(300);
  if (error || !products) return [];
  const productIds = products.map((p: any) => p.id);
  const { data: prices } = await supabase.from("prices").select("*").in("product_id", productIds).order("scraped_at", { ascending: false });
  return products.map((product: any) => {
    const productPrices = (prices || []).filter((p: any) => p.product_id === product.id);
    const lowestPrice = productPrices.length > 0 ? Math.min(...productPrices.map((p: any) => p.price)) : null;
    return { ...product, prices: productPrices, lowestPrice };
  });
}

export async function getDealsWithProducts(limit = 20) {
  const { data, error } = await supabase.from("active_deals").select("*").limit(limit);
  if (error || !data) return [];
  return data;
}

export async function getSiteStats() {
  const [productsRes, pricesRes, dealsRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("prices").select("id", { count: "exact", head: true }),
    supabase.from("active_deals").select("price_id", { count: "exact", head: true }),
  ]);
  return { totalProducts: productsRes.count || 0, totalPrices: pricesRes.count || 0, activeDeals: dealsRes.count || 0 };
}
