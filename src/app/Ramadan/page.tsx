import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase, getRamadanProducts, getDealsWithProducts, getSiteStats } from "@/lib/supabase";

// Ramadan category groupings (Arabic keywords to match product names)
const RAMADAN_CATEGORIES = [
  { id: "rice", nameAr: "الأرز والمكرونة", icon: "🍚", keywords: ["أرز", "مكرونة", "بسمتي", "رز"] },
  { id: "oil", nameAr: "الزيوت والسمن", icon: "🫒", keywords: ["زيت", "سمن", "زبدة", "عافية", "كريستال"] },
  { id: "dairy", nameAr: "الألبان والأجبان", icon: "🥛", keywords: ["لبن", "جبن", "زبادي", "حليب", "جهينة", "دومتي"] },
  { id: "meat", nameAr: "اللحوم والدواجن", icon: "🍗", keywords: ["لحم", "فراخ", "دجاج", "كفتة", "برجر", "ناجتس"] },
  { id: "drinks", nameAr: "العصائر والمشروبات", icon: "🥤", keywords: ["عصير", "بيبسي", "كوكا", "مياه", "تانج", "فيمتو", "قمر الدين"] },
  { id: "dates", nameAr: "التمور والياميش", icon: "🌴", keywords: ["تمر", "بلح", "مشمش", "قراصيا", "ياميش", "مكسرات"] },
  { id: "sugar", nameAr: "السكر والحلويات", icon: "🍬", keywords: ["سكر", "شوكولاتة", "حلاوة", "عسل", "مربى"] },
  { id: "essentials", nameAr: "أساسيات المطبخ", icon: "🧂", keywords: ["ملح", "فلفل", "بهارات", "شاي", "قهوة", "دقيق"] },
];

// Store display names
const STORE_NAMES: Record<string, string> = {
  carrefour: "كارفور",
  spinneys: "سبينيز",
  kazyon: "كازيون",
  kheirzaman: "خير زمان",
  talabat: "طلبات مارت",
  breadfast: "بريدفاست",
};

function classifyProduct(nameAr: string): string | null {
  const lower = nameAr;
  for (const cat of RAMADAN_CATEGORIES) {
    if (cat.keywords.some((kw) => lower.includes(kw))) {
      return cat.id;
    }
  }
  return null;
}

export const metadata = {
  title: "عروض رمضان ٢٠٢٦ - أرخص أسعار البقالة | صح Sa7",
  description:
    "تابع أسعار رمضان ٢٠٢٦ يومياً. قارن أسعار الأرز والزيت واللحوم والدواجن بين كارفور وسبينيز وكازيون. اعرف أرخص مكان تشتري منه في رمضان.",
  keywords:
    "عروض رمضان 2026, اسعار رمضان, عروض كارفور رمضان, اسعار الارز, اسعار الزيت, اسعار الفراخ, بقالة رمضان مصر",
};

export default async function RamadanPage() {
  // Fetch real data from Supabase
  let allProducts = await getRamadanProducts();
  const deals = await getDealsWithProducts(30);
  const stats = await getSiteStats();

  // Group products by Ramadan category
  const grouped: Record<string, typeof allProducts> = {};
  for (const product of allProducts) {
    const catId = classifyProduct(product.name_ar || "");
    if (catId) {
      if (!grouped[catId]) grouped[catId] = [];
      grouped[catId].push(product);
    }
  }

  // Sort each category by lowest price
  for (const catId of Object.keys(grouped)) {
    grouped[catId].sort((a, b) => (a.lowestPrice || 9999) - (b.lowestPrice || 9999));
  }

  // Calculate Ramadan countdown
  const ramadanStart = new Date("2026-02-28"); // Approximate
  const now = new Date();
  const daysIn = Math.floor((now.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Ramadan Hero */}
      <section className="bg-gradient-to-bl from-purple-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        {/* Decorative crescents */}
        <div className="absolute top-4 left-8 text-6xl opacity-10">🌙</div>
        <div className="absolute bottom-4 right-12 text-8xl opacity-10">🌙</div>
        <div className="absolute top-1/2 left-1/3 text-4xl opacity-5">⭐</div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🌙</span>
              <span>رمضان كريم ٢٠٢٦ — اليوم {daysIn > 0 ? daysIn : 1} من رمضان</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              أسعار رمضان ٢٠٢٦
              <br />
              <span className="text-amber-300">محدّثة كل يوم</span>
            </h1>
            <p className="text-lg text-purple-100 mb-8 leading-relaxed">
              تابع أسعار مستلزمات رمضان يومياً. الأرز والزيت واللحوم والعصائر — اعرف
              أرخص مكان تشتري منه النهاردة.
            </p>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                <div className="font-black text-xl">{stats.totalProducts || "٢٠٨"}+</div>
                <div className="text-xs text-purple-200">منتج متتبع</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                <div className="font-black text-xl">{stats.activeDeals || "٣١"}</div>
                <div className="text-xs text-purple-200">عرض نشط</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                <div className="font-black text-xl">٦ ص</div>
                <div className="text-xs text-purple-200">تحديث يومي</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick category jump */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {RAMADAN_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-1.5 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-700 transition whitespace-nowrap"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameAr}</span>
                {grouped[cat.id] && (
                  <span className="bg-purple-100 text-purple-700 text-xs px-1.5 rounded-full">
                    {grouped[cat.id].length}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ramadan Deals */}
      {deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🔥</span>
            <h2 className="text-xl font-black text-gray-900">عروض رمضان النهاردة</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {deals.slice(0, 8).map((deal) => {
              const product = (deal as any).product;
              if (!product) return null;
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all relative overflow-hidden"
                >
                  {deal.discount_percent && deal.discount_percent > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{Math.round(deal.discount_percent)}%
                    </div>
                  )}
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">
                      {product.image_url ? "📦" : "🛒"}
                    </div>
                    {deal.badge && (
                      <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                        {deal.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug line-clamp-2">
                    {product.name_ar}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {STORE_NAMES[deal.store_id] || deal.store_id}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-emerald-600">
                      {deal.deal_price} ج.م
                    </span>
                    {deal.original_price && (
                      <span className="text-sm text-gray-400 line-through">
                        {deal.original_price} ج.م
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Products by Ramadan Category */}
      {RAMADAN_CATEGORIES.map((cat) => {
        const items = grouped[cat.id];
        if (!items || items.length === 0) return null;

        return (
          <section key={cat.id} id={cat.id} className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-xl font-black text-gray-900">{cat.nameAr}</h2>
              <span className="text-sm text-gray-400">({items.length} منتج)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.slice(0, 8).map((product) => {
                const deal = product.deal;
                const prices = product.prices || [];
                const cheapest = prices.length > 0 ? prices.reduce((a, b) => (a.price < b.price ? a : b)) : null;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Product header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1 line-clamp-2">
                            {product.name_ar}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {product.brand || ""} {product.unit ? `· ${product.unit}` : ""}
                          </p>
                        </div>
                        {deal && deal.discount_percent && deal.discount_percent > 0 && (
                          <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                            -{Math.round(deal.discount_percent)}%
                          </span>
                        )}
                      </div>

                      {/* Prices by store */}
                      <div className="space-y-1.5">
                        {prices.slice(0, 3).map((p, idx) => (
                          <div
                            key={`${p.store_id}-${idx}`}
                            className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs ${
                              idx === 0
                                ? "bg-emerald-50 border border-emerald-100"
                                : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {idx === 0 && (
                                <span className="text-emerald-600 font-bold">✓</span>
                              )}
                              <span
                                className={`font-semibold ${
                                  idx === 0 ? "text-emerald-700" : "text-gray-600"
                                }`}
                              >
                                {STORE_NAMES[p.store_id] || p.store_id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {p.original_price && p.original_price > p.price && (
                                <span className="line-through text-gray-400 text-[10px]">
                                  {p.original_price} ج.م
                                </span>
                              )}
                              <span
                                className={`font-bold ${
                                  idx === 0 ? "text-emerald-700" : "text-gray-700"
                                }`}
                              >
                                {p.price} ج.م
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {items.length > 8 && (
              <div className="text-center mt-4">
                <Link
                  href="/categories"
                  className="text-sm text-purple-600 font-semibold hover:underline"
                >
                  عرض كل {cat.nameAr} ({items.length} منتج) ←
                </Link>
              </div>
            )}
          </section>
        );
      })}

      {/* WhatsApp CTA */}
      <section className="bg-gradient-to-bl from-green-600 to-emerald-700 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-4xl mb-4">📱</div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            تابعنا على الواتساب
          </h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
            هنبعتلك أحسن عروض رمضان كل يوم على الواتساب. أسعار محدّثة + عروض
            حصرية.
          </p>
          <a
            href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=عايز%20أتابع%20عروض%20رمضان"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition shadow-lg"
          >
            <span>💬</span>
            <span>تابعنا على واتساب</span>
          </a>
        </div>
      </section>

      {/* SEO content block */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="font-black text-lg text-gray-900 mb-4">
            أسعار رمضان ٢٠٢٦ في مصر
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              صح هو أول موقع مقارنة أسعار بقالة في مصر. بنتابع أسعار أكتر من{" "}
              {stats.totalProducts || 200} منتج يومياً في كارفور وسبينيز وكازيون
              وخير زمان وطلبات وبريدفاست.
            </p>
            <p>
              في رمضان ٢٠٢٦، الأسعار بتتغير كل يوم. الأرز والزيت واللحوم
              والدواجن والعصائر — كلها بتتحدث الساعة ٦ الصبح عشان تعرف أرخص مكان
              تشتري منه قبل ما تنزل السوق.
            </p>
            <p>
              تابعنا على واتساب وهنبعتلك أحسن العروض كل يوم. صح — وفّر فلوسك في
              رمضان.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
