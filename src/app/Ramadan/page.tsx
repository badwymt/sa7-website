import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getRamadanProducts, getDealsWithProducts, getSiteStats } from "@/lib/supabase";

const RAMADAN_CATEGORIES = [
  { id: "rice", nameAr: "الأرز والمكرونة", icon: "🍚", keywords: ["أرز", "مكرونة", "بسمتي", "رز"] },
  { id: "oil", nameAr: "الزيوت والسمن", icon: "🫒", keywords: ["زيت", "سمن", "زبدة", "عافية", "كريستال"] },
  { id: "dairy", nameAr: "الألبان والأجبان", icon: "🥛", keywords: ["لبن", "جبن", "زبادي", "حليب", "جهينة", "دومتي"] },
  { id: "meat", nameAr: "اللحوم والدواجن", icon: "🍗", keywords: ["لحم", "فراخ", "دجاج", "كفتة", "برجر", "ناجتس"] },
  { id: "drinks", nameAr: "العصائر والمشروبات", icon: "🥤", keywords: ["عصير", "بيبسي", "كوكا", "مياه", "تانج", "فيمتو"] },
  { id: "essentials", nameAr: "أساسيات المطبخ", icon: "🧂", keywords: ["ملح", "فلفل", "بهارات", "شاي", "قهوة", "دقيق", "سكر"] },
];

const STORE_NAMES: Record<string, string> = {
  carrefour: "كارفور", spinneys: "سبينيز", kazyon: "كازيون",
  kheirzaman: "خير زمان", talabat: "طلبات مارت", breadfast: "بريدفاست",
};

function classifyProduct(nameAr: string): string | null {
  for (const cat of RAMADAN_CATEGORIES) {
    if (cat.keywords.some((kw) => nameAr.includes(kw))) return cat.id;
  }
  return null;
}

export const metadata = {
  title: "عروض رمضان ٢٠٢٦ - أرخص أسعار البقالة | صح Sa7",
  description: "تابع أسعار رمضان ٢٠٢٦ يومياً. قارن أسعار الأرز والزيت واللحوم والدواجن بين كارفور وسبينيز وكازيون.",
};

export default async function RamadanPage() {
  const allProducts = await getRamadanProducts();
  const deals = await getDealsWithProducts(30);
  const stats = await getSiteStats();

  const grouped: Record<string, typeof allProducts> = {};
  for (const product of allProducts) {
    const catId = classifyProduct(product.name_ar || "");
    if (catId) {
      if (!grouped[catId]) grouped[catId] = [];
      grouped[catId].push(product);
    }
  }
  for (const catId of Object.keys(grouped)) {
    grouped[catId].sort((a: any, b: any) => (a.lowestPrice || 9999) - (b.lowestPrice || 9999));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-bl from-purple-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute top-4 left-8 text-6xl opacity-10">🌙</div>
        <div className="absolute bottom-4 right-12 text-8xl opacity-10">🌙</div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🌙</span><span>رمضان كريم ٢٠٢٦</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">أسعار رمضان ٢٠٢٦<br /><span className="text-amber-300">محدّثة كل يوم</span></h1>
            <p className="text-lg text-purple-100 mb-8 leading-relaxed">تابع أسعار مستلزمات رمضان يومياً. الأرز والزيت واللحوم والعصائر — اعرف أرخص مكان تشتري منه النهاردة.</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center"><div className="font-black text-xl">{stats.totalProducts || 208}+</div><div className="text-xs text-purple-200">منتج متتبع</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center"><div className="font-black text-xl">{stats.activeDeals || 0}</div><div className="text-xs text-purple-200">عرض نشط</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center"><div className="font-black text-xl">٦ ص</div><div className="text-xs text-purple-200">تحديث يومي</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {RAMADAN_CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="flex items-center gap-1.5 bg-gray-50 hover:bg-purple-50 hover:border-purple-200 border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-700 transition whitespace-nowrap">
                <span>{cat.icon}</span><span>{cat.nameAr}</span>
                {grouped[cat.id] && <span className="bg-purple-100 text-purple-700 text-xs px-1.5 rounded-full">{grouped[cat.id].length}</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-6"><span className="text-2xl">🔥</span><h2 className="text-xl font-black text-gray-900">عروض رمضان النهاردة</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {deals.slice(0, 8).map((deal: any) => {
              const discount = deal.old_price && deal.price ? Math.round(((deal.old_price - deal.price) / deal.old_price) * 100) : 0;
              return (
                <div key={deal.price_id} className="bg-white rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all relative overflow-hidden">
                  {discount > 0 && <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</div>}
                  <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug line-clamp-2">{deal.product_name_ar}</h3>
                  <p className="text-xs text-gray-400 mb-2">{STORE_NAMES[deal.store_id] || deal.store_id}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-emerald-600">{deal.price} ج.م</span>
                    {deal.old_price && <span className="text-sm text-gray-400 line-through">{deal.old_price} ج.م</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {RAMADAN_CATEGORIES.map((cat) => {
        const items = grouped[cat.id];
        if (!items || items.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4"><span className="text-2xl">{cat.icon}</span><h2 className="text-xl font-black text-gray-900">{cat.nameAr}</h2><span className="text-sm text-gray-400">({items.length} منتج)</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.slice(0, 8).map((product: any) => {
                const prices = product.prices || [];
                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1 line-clamp-2">{product.name_ar}</h3>
                      <p className="text-xs text-gray-400 mb-3">{product.brand || ""} {product.unit ? `· ${product.unit}` : ""}</p>
                      <div className="space-y-1.5">
                        {prices.slice(0, 3).map((p: any, idx: number) => (
                          <div key={p.id} className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs ${idx === 0 ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50"}`}>
                            <span className={`font-semibold ${idx === 0 ? "text-emerald-700" : "text-gray-600"}`}>{idx === 0 && "✓ "}{STORE_NAMES[p.store_id] || p.store_id}</span>
                            <span className={`font-bold ${idx === 0 ? "text-emerald-700" : "text-gray-700"}`}>{p.price} ج.م</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="bg-gradient-to-bl from-green-600 to-emerald-700 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">تابعنا على الواتساب 📱</h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">هنبعتلك أحسن عروض رمضان كل يوم على الواتساب.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="font-black text-lg text-gray-900 mb-4">أسعار رمضان ٢٠٢٦ في مصر</h2>
          <p className="text-sm text-gray-600 leading-relaxed">صح هو أول موقع مقارنة أسعار بقالة في مصر. بنتابع أسعار أكتر من {stats.totalProducts || 200} منتج يومياً. تابعنا على واتساب وهنبعتلك أحسن العروض كل يوم.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
