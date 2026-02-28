// Sa7 - Egyptian Grocery Price Comparison Data
export interface Store {
  id: string;
  name: string;
  nameAr: string;
  type: 'chain' | 'delivery';
  logo: string;
  color: string;
  website: string;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  brand: string;
  unit: string;
  image: string;
}

export interface Price {
  productId: string;
  storeId: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  lastUpdated: string;
  url: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  productCount: number;
}

export interface PriceHistory {
  date: string;
  prices: { storeId: string; price: number }[];
}

export const stores: Store[] = [
  { id: 'carrefour', name: 'Carrefour Egypt', nameAr: 'كارفور مصر', type: 'chain', logo: '🏪', color: '#004A9B', website: 'https://www.carrefouregypt.com' },
  { id: 'spinneys', name: 'Spinneys', nameAr: 'سبينيز', type: 'chain', logo: '🛒', color: '#E31837', website: 'https://www.spinneysonline.com' },
  { id: 'kazyon', name: 'Kazyon', nameAr: 'كازيون', type: 'chain', logo: '💰', color: '#FF6B00', website: '#' },
  { id: 'kheirzaman', name: 'Kheir Zaman', nameAr: 'خير زمان', type: 'chain', logo: '🏬', color: '#2E7D32', website: 'https://www.kheirzaman.com' },
  { id: 'talabat', name: 'Talabat Mart', nameAr: 'طلبات مارت', type: 'delivery', logo: '🛵', color: '#FF5A00', website: 'https://www.talabat.com' },
  { id: 'breadfast', name: 'Breadfast', nameAr: 'بريدفاست', type: 'delivery', logo: '🚀', color: '#00BFA5', website: 'https://www.breadfast.com' },
];

export const categories: Category[] = [
  { id: 'rice', nameAr: 'الأرز', nameEn: 'Rice', icon: '🍚', productCount: 24 },
  { id: 'oil', nameAr: 'الزيوت', nameEn: 'Cooking Oil', icon: '🫒', productCount: 18 },
  { id: 'dairy', nameAr: 'الألبان', nameEn: 'Dairy', icon: '🥛', productCount: 32 },
  { id: 'poultry', nameAr: 'الدواجن', nameEn: 'Poultry', icon: '🍗', productCount: 15 },
  { id: 'meat', nameAr: 'اللحوم', nameEn: 'Meat', icon: '🥩', productCount: 20 },
  { id: 'bread', nameAr: 'الخبز والمعجنات', nameEn: 'Bread & Bakery', icon: '🍞', productCount: 14 },
  { id: 'vegetables', nameAr: 'الخضروات', nameEn: 'Vegetables', icon: '🥬', productCount: 28 },
  { id: 'fruits', nameAr: 'الفواكه', nameEn: 'Fruits', icon: '🍎', productCount: 22 },
  { id: 'snacks', nameAr: 'السناكس', nameEn: 'Snacks', icon: '🍪', productCount: 30 },
  { id: 'beverages', nameAr: 'المشروبات', nameEn: 'Beverages', icon: '🥤', productCount: 26 },
  { id: 'cleaning', nameAr: 'منتجات التنظيف', nameEn: 'Cleaning', icon: '🧹', productCount: 20 },
  { id: 'baby', nameAr: 'مستلزمات الأطفال', nameEn: 'Baby Care', icon: '👶', productCount: 16 },
];

export const products: Product[] = [
  // Rice
  { id: 'toshiba-rice-5kg', nameAr: 'أرز توشيبا ٥ كيلو', nameEn: 'Toshiba Rice 5kg', category: 'rice', brand: 'Toshiba', unit: '5kg', image: '🍚' },
  { id: 'abo-kass-rice-5kg', nameAr: 'أرز أبو كاس ٥ كيلو', nameEn: 'Abu Kass Rice 5kg', category: 'rice', brand: 'Abu Kass', unit: '5kg', image: '🍚' },
  { id: 'royal-rice-1kg', nameAr: 'أرز رويال ١ كيلو', nameEn: 'Royal Rice 1kg', category: 'rice', brand: 'Royal', unit: '1kg', image: '🍚' },
  { id: 'arabi-rice-5kg', nameAr: 'أرز عربي ٥ كيلو', nameEn: 'Arabi Rice 5kg', category: 'rice', brand: 'Arabi', unit: '5kg', image: '🍚' },
  // Oil
  { id: 'crystal-oil-1l', nameAr: 'زيت كريستال ١ لتر', nameEn: 'Crystal Oil 1L', category: 'oil', brand: 'Crystal', unit: '1L', image: '🫒' },
  { id: 'slite-oil-2l', nameAr: 'زيت سلايت ٢ لتر', nameEn: 'Slite Oil 2L', category: 'oil', brand: 'Slite', unit: '2L', image: '🫒' },
  { id: 'afia-oil-1l', nameAr: 'زيت عافية ١ لتر', nameEn: 'Afia Sunflower Oil 1L', category: 'oil', brand: 'Afia', unit: '1L', image: '🫒' },
  // Dairy
  { id: 'juhayna-milk-1l', nameAr: 'لبن جهينة كامل الدسم ١ لتر', nameEn: 'Juhayna Full Cream Milk 1L', category: 'dairy', brand: 'Juhayna', unit: '1L', image: '🥛' },
  { id: 'domty-cheese-250g', nameAr: 'جبنة دومتي بيضاء ٢٥٠ جم', nameEn: 'Domty White Cheese 250g', category: 'dairy', brand: 'Domty', unit: '250g', image: '🧀' },
  { id: 'president-butter-200g', nameAr: 'زبدة بريزيدون ٢٠٠ جم', nameEn: 'President Butter 200g', category: 'dairy', brand: 'President', unit: '200g', image: '🧈' },
  { id: 'almarai-yogurt-1kg', nameAr: 'زبادي المراعي ١ كيلو', nameEn: 'Almarai Yogurt 1kg', category: 'dairy', brand: 'Almarai', unit: '1kg', image: '🥛' },
  // Poultry
  { id: 'cairo-poultry-1kg', nameAr: 'فراخ كايرو بولتري ١ كيلو', nameEn: 'Cairo Poultry Chicken 1kg', category: 'poultry', brand: 'Cairo Poultry', unit: '1kg', image: '🍗' },
  { id: 'americana-nuggets-400g', nameAr: 'ناجتس أمريكانا ٤٠٠ جم', nameEn: 'Americana Nuggets 400g', category: 'poultry', brand: 'Americana', unit: '400g', image: '🍗' },
  // Snacks
  { id: 'chipsy-cheese-70g', nameAr: 'شيبسي بالجبنة ٧٠ جم', nameEn: 'Chipsy Cheese 70g', category: 'snacks', brand: 'Chipsy', unit: '70g', image: '🍪' },
  { id: 'molto-croissant', nameAr: 'مولتو كرواسون شوكولاتة', nameEn: 'Molto Chocolate Croissant', category: 'snacks', brand: 'Molto', unit: '1pc', image: '🥐' },
  // Beverages
  { id: 'pepsi-1l', nameAr: 'بيبسي ١ لتر', nameEn: 'Pepsi 1L', category: 'beverages', brand: 'Pepsi', unit: '1L', image: '🥤' },
  { id: 'nestle-water-1.5l', nameAr: 'مياه نستله ١.٥ لتر', nameEn: 'Nestle Water 1.5L', category: 'beverages', brand: 'Nestle', unit: '1.5L', image: '💧' },
  // Cleaning
  { id: 'persil-gel-1l', nameAr: 'بيرسيل جل ١ لتر', nameEn: 'Persil Gel 1L', category: 'cleaning', brand: 'Persil', unit: '1L', image: '🧹' },
  { id: 'fairy-dish-750ml', nameAr: 'فيري سائل أطباق ٧٥٠ مل', nameEn: 'Fairy Dish Liquid 750ml', category: 'cleaning', brand: 'Fairy', unit: '750ml', image: '🫧' },
  // Baby
  { id: 'pampers-size4-44', nameAr: 'بامبرز مقاس ٤ - ٤٤ قطعة', nameEn: 'Pampers Size 4 - 44pcs', category: 'baby', brand: 'Pampers', unit: '44pcs', image: '👶' },
];

// Generate realistic prices
function generatePrice(base: number, variance: number): number {
  return Math.round((base + (Math.random() - 0.5) * variance) * 100) / 100;
}

const priceMap: Record<string, Record<string, { price: number; old?: number }>> = {
  'toshiba-rice-5kg': { carrefour: { price: 135, old: 145 }, spinneys: { price: 149 }, kazyon: { price: 125 }, kheirzaman: { price: 132 }, talabat: { price: 142 }, breadfast: { price: 139 } },
  'abo-kass-rice-5kg': { carrefour: { price: 189 }, spinneys: { price: 199, old: 215 }, kazyon: { price: 179 }, kheirzaman: { price: 185 }, talabat: { price: 195 }, breadfast: { price: 192 } },
  'royal-rice-1kg': { carrefour: { price: 42 }, spinneys: { price: 45 }, kazyon: { price: 38 }, kheirzaman: { price: 40 }, talabat: { price: 44 }, breadfast: { price: 43 } },
  'arabi-rice-5kg': { carrefour: { price: 115, old: 125 }, spinneys: { price: 129 }, kazyon: { price: 109 }, kheirzaman: { price: 118 }, talabat: { price: 125 }, breadfast: { price: 120 } },
  'crystal-oil-1l': { carrefour: { price: 72, old: 78 }, spinneys: { price: 79 }, kazyon: { price: 68 }, kheirzaman: { price: 71 }, talabat: { price: 76 }, breadfast: { price: 74 } },
  'slite-oil-2l': { carrefour: { price: 138 }, spinneys: { price: 149 }, kazyon: { price: 132 }, kheirzaman: { price: 135, old: 142 }, talabat: { price: 145 }, breadfast: { price: 140 } },
  'afia-oil-1l': { carrefour: { price: 85 }, spinneys: { price: 92 }, kazyon: { price: 79 }, kheirzaman: { price: 83, old: 89 }, talabat: { price: 89 }, breadfast: { price: 87 } },
  'juhayna-milk-1l': { carrefour: { price: 32 }, spinneys: { price: 35 }, kazyon: { price: 29 }, kheirzaman: { price: 31 }, talabat: { price: 34 }, breadfast: { price: 32, old: 35 } },
  'domty-cheese-250g': { carrefour: { price: 28, old: 32 }, spinneys: { price: 34 }, kazyon: { price: 25 }, kheirzaman: { price: 27 }, talabat: { price: 30 }, breadfast: { price: 29 } },
  'president-butter-200g': { carrefour: { price: 75 }, spinneys: { price: 82 }, kazyon: { price: 69 }, kheirzaman: { price: 72 }, talabat: { price: 79 }, breadfast: { price: 76, old: 82 } },
  'almarai-yogurt-1kg': { carrefour: { price: 48 }, spinneys: { price: 55 }, kazyon: { price: 42 }, kheirzaman: { price: 46 }, talabat: { price: 52 }, breadfast: { price: 49 } },
  'cairo-poultry-1kg': { carrefour: { price: 145, old: 155 }, spinneys: { price: 159 }, kazyon: { price: 135 }, kheirzaman: { price: 142 }, talabat: { price: 155 }, breadfast: { price: 148 } },
  'americana-nuggets-400g': { carrefour: { price: 89 }, spinneys: { price: 95 }, kazyon: { price: 82 }, kheirzaman: { price: 85 }, talabat: { price: 92, old: 99 }, breadfast: { price: 90 } },
  'chipsy-cheese-70g': { carrefour: { price: 15 }, spinneys: { price: 17 }, kazyon: { price: 12 }, kheirzaman: { price: 14 }, talabat: { price: 16 }, breadfast: { price: 15 } },
  'molto-croissant': { carrefour: { price: 8 }, spinneys: { price: 10 }, kazyon: { price: 7 }, kheirzaman: { price: 8 }, talabat: { price: 9 }, breadfast: { price: 8 } },
  'pepsi-1l': { carrefour: { price: 22 }, spinneys: { price: 25 }, kazyon: { price: 19 }, kheirzaman: { price: 21 }, talabat: { price: 24 }, breadfast: { price: 22, old: 25 } },
  'nestle-water-1.5l': { carrefour: { price: 8 }, spinneys: { price: 10 }, kazyon: { price: 6 }, kheirzaman: { price: 7 }, talabat: { price: 9 }, breadfast: { price: 8 } },
  'persil-gel-1l': { carrefour: { price: 95, old: 105 }, spinneys: { price: 109 }, kazyon: { price: 88 }, kheirzaman: { price: 92 }, talabat: { price: 102 }, breadfast: { price: 98 } },
  'fairy-dish-750ml': { carrefour: { price: 52 }, spinneys: { price: 58 }, kazyon: { price: 48 }, kheirzaman: { price: 50 }, talabat: { price: 55, old: 62 }, breadfast: { price: 53 } },
  'pampers-size4-44': { carrefour: { price: 295, old: 320 }, spinneys: { price: 335 }, kazyon: { price: 275 }, kheirzaman: { price: 289 }, talabat: { price: 315 }, breadfast: { price: 305 } },
};

export const prices: Price[] = [];
for (const [productId, storePrices] of Object.entries(priceMap)) {
  for (const [storeId, data] of Object.entries(storePrices)) {
    prices.push({
      productId,
      storeId,
      price: data.price,
      oldPrice: data.old,
      inStock: Math.random() > 0.05,
      lastUpdated: '2026-02-27T06:00:00Z',
      url: '#',
    });
  }
}

export function getProductPrices(productId: string) {
  return prices
    .filter(p => p.productId === productId)
    .map(p => ({ ...p, store: stores.find(s => s.id === p.storeId)! }))
    .sort((a, b) => a.price - b.price);
}

export function getCheapestPrice(productId: string) {
  const pp = getProductPrices(productId);
  return pp.length > 0 ? pp[0] : null;
}

export function getProductsByCategory(categoryId: string) {
  return products.filter(p => p.category === categoryId);
}

export function getStoreProducts(storeId: string) {
  const storeProductIds = prices.filter(p => p.storeId === storeId).map(p => p.productId);
  return products.filter(p => storeProductIds.includes(p.id));
}

export function generatePriceHistory(productId: string): PriceHistory[] {
  const history: PriceHistory[] = [];
  const basePrices = getProductPrices(productId);
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split('T')[0],
      prices: basePrices.map(p => ({
        storeId: p.storeId,
        price: Math.round((p.price * (1 + (Math.random() - 0.5) * 0.1)) * 100) / 100,
      })),
    });
  }
  return history;
}

export interface Deal {
  id: string;
  productId: string;
  storeId: string;
  discount: number;
  originalPrice: number;
  salePrice: number;
  endsAt: string;
  badge: string;
}

export const deals: Deal[] = [
  { id: 'd1', productId: 'toshiba-rice-5kg', storeId: 'carrefour', discount: 7, originalPrice: 145, salePrice: 135, endsAt: '2026-03-05', badge: 'عرض رمضان 🌙' },
  { id: 'd2', productId: 'crystal-oil-1l', storeId: 'carrefour', discount: 8, originalPrice: 78, salePrice: 72, endsAt: '2026-03-05', badge: 'عرض رمضان 🌙' },
  { id: 'd3', productId: 'cairo-poultry-1kg', storeId: 'carrefour', discount: 6, originalPrice: 155, salePrice: 145, endsAt: '2026-03-01', badge: 'عرض الأسبوع' },
  { id: 'd4', productId: 'domty-cheese-250g', storeId: 'carrefour', discount: 13, originalPrice: 32, salePrice: 28, endsAt: '2026-03-01', badge: 'خصم خاص' },
  { id: 'd5', productId: 'president-butter-200g', storeId: 'breadfast', discount: 7, originalPrice: 82, salePrice: 76, endsAt: '2026-03-02', badge: 'توصيل مجاني' },
  { id: 'd6', productId: 'persil-gel-1l', storeId: 'carrefour', discount: 10, originalPrice: 105, salePrice: 95, endsAt: '2026-03-05', badge: 'عرض رمضان 🌙' },
  { id: 'd7', productId: 'pampers-size4-44', storeId: 'carrefour', discount: 8, originalPrice: 320, salePrice: 295, endsAt: '2026-03-10', badge: 'عرض الشهر' },
  { id: 'd8', productId: 'arabi-rice-5kg', storeId: 'carrefour', discount: 8, originalPrice: 125, salePrice: 115, endsAt: '2026-03-05', badge: 'عرض رمضان 🌙' },
  { id: 'd9', productId: 'pepsi-1l', storeId: 'breadfast', discount: 12, originalPrice: 25, salePrice: 22, endsAt: '2026-03-03', badge: 'خصم التوصيل' },
  { id: 'd10', productId: 'fairy-dish-750ml', storeId: 'talabat', discount: 11, originalPrice: 62, salePrice: 55, endsAt: '2026-03-04', badge: 'عرض خاص' },
  { id: 'd11', productId: 'spinneys' as string, storeId: 'spinneys', discount: 0, originalPrice: 0, salePrice: 0, endsAt: '2026-03-05', badge: 'تخفيضات سبينيز' },
  { id: 'd12', productId: 'juhayna-milk-1l', storeId: 'breadfast', discount: 9, originalPrice: 35, salePrice: 32, endsAt: '2026-03-02', badge: 'عرض الصباح ☀️' },
];

export const trendingSearches = [
  'أرز توشيبا', 'زيت عافية', 'لبن جهينة', 'فراخ', 'سكر', 'شاي', 'زبدة', 'جبنة',
  'بامبرز', 'زيت طعام', 'أرز بسمتي', 'دقيق',
];
