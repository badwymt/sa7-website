import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  getRamadanProducts,
  getDealsWithProducts,
  getSiteStats,
} from "@/lib/supabase";

const RAMADAN_CATEGORIES = [
  {
    id: "rice",
    nameAr: "الأرز والمكرونة",
    icon: "🍚",
    keywords: ["أرز", "مكرونة", "بسمتي", "رز"],
  },
  {
    id: "oil",
    nameAr: "الزيوت والسمن",
    icon: "🫒",
    keywords: ["زيت", "سمن", "زبدة", "عافية", "كريستال"],
  },
  {
    id: "dairy",
    nameAr: "الألبان والأجبان",
    icon: "🥛",
    keywords: ["لبن", "جبن", "زبادي", "حليب", "جهينة", "دومتي"],
  },
  {
    id: "meat",
    nameAr: "اللحوم والدواجن",
    icon: "🍗",
    keywords: ["لحم", "فراخ", "دجاج", "كفتة", "برجر", "ناجتس"],
  },
  {
    id: "drinks",
    nameAr: "العصائر والمشروبات",
    icon: "🥤",
    keywords: ["عصير", "بيبسي", "كوكا", "مياه", "تانج", "فيمتو"],
  },
  {
    id: "essentials",
    nameAr: "أساسيات المطبخ",
    icon: "🧂",
    keywords: ["ملح", "فلفل", "بهارات", "شاي", "قهوة", "دقيق", "سكر"],
  },
];

const STORE_INFO: Record<string, { nameAr: string; color: string; bg: string }> = {
  carrefour: { nameAr: "كارفور", color: "text-blue-700", bg: "bg-blue-50 border-blue-100" },
  spinneys: { nameAr: "سبينيز", color: "text-green-700", bg: "bg-green-50 border-green-100" },
  kazyon: { nameAr: "كازيون", color: "text-red-700", bg: "bg-red-50 border-red-100" },
  kheirzaman: { nameAr: "خير زمان", color: "text-amber-700", bg: "bg-amber-50 border-amber-100" },
  talabat: { nameAr: "طلبات مارت", color: "text-orange-700", bg: "bg-orange-50 border-orange-100" },
  breadfast: { nameAr: "بريدفاست", color: "text-purple-700", bg: "bg-purple-50 border-purple-100" },
};

const STORE_LOGOS: Record<string, string> = {
  carrefour: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/200px-Carrefour_logo.svg.png",
};

function classifyProduct(nameAr: string): string | null {
  for (const cat of RAMADAN_CATEGORIES) {
    if (cat.keywords.some((kw) => nameAr.includes(kw))) return cat.id;
  }
  return null;
}

export const metadata = {
  title: "عروض رمضان ٢٠٢٦ - أرخص أسعار البقالة | صح Sa7",
  description:
    "تابع أسعار رمضان ٢٠٢٦ يومياً. قارن أسعار الأرز والزيت واللحوم والدواجن بين كارفور وسبينيز وكازيون.",
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
    grouped[catId].sort(
      (a: any, b: any) => (a.lowestPrice || 9999) - (b.lowestPrice || 9999)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-purple-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-12 text-[120px] leading-none">&#9790;</div>
          <div className="absolute bottom-8 right-16 text-[80px] leading-none">&#9790;</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
                <span>&#9790;</span>
                <span>رمضان كريم ٢٠٢٦</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                أسعار رمضان ٢٠٢٦
                <br />
                <span className="text-amber-300">محدّثة كل يوم</span>
              </h1>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                تابع أسعار مستلزمات رمضان يومياً. الأرز والزيت واللحوم والعصائر
                — اعرف أرخص مكان تشتري منه النهاردة.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-black text-xl">
                    {stats.totalProducts || 208}+
                  </div>
                  <div className="text-xs text-purple-200">منتج متتبع</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-black text-xl">
                    {stats.activeDeals || 0}
                  </div>
                  <div className="text-xs text-purple-200">عرض نشط</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center">
                  <div className="font-black text-xl">٦ ص</div>
                  <div className="text-xs text-purple-200">تحديث يومي</div>
                </div>
              </div>
            </div>
            {/* WhatsApp CTA in hero */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-sm">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500 rounded-full mb-3">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1112 20z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-1">تابع العروض على واتساب</h3>
                <p className="text-sm text-purple-200 mb-4">كلمنا وهنبعتلك أحسن عروض رمضان يومياً</p>
              </div>
              <a
                href="https://wa.me/201034737110?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%AA%D8%A7%D8%A8%D8%B9%20%D8%B9%D8%B1%D9%88%D8%B6%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-center transition-colors"
              >
                ابعتلنا على واتساب
              </a>
              <p className="text-xs text-purple-300 text-center mt-2" dir="ltr">+20 103 473 7110</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
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

      {/* Today's Deals */}
      {deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm">%</div>
            <h2 className="text-xl font-black text-gray-900">
              عروض رمضان النهاردة
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {deals.slice(0, 8).map((deal: any) => {
              const discount =
                deal.old_price && deal.price
                  ? Math.round(
                      ((deal.old_price - deal.price) / deal.old_price) * 100
                    )
                  : 0;
              const storeInfo = STORE_INFO[deal.store_id] || { nameAr: deal.store_id, color: "text-gray-600", bg: "bg-gray-50 border-gray-100" };
              return (
                <div
                  key={deal.price_id}
                  className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all relative overflow-hidden group"
                >
                  {/* Product Image */}
                  {deal.product_image && (
                    <div className="w-full h-28 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={deal.product_image}
                        alt={deal.product_name_ar}
                        className="max-h-24 max-w-[80%] object-contain group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    {discount > 0 && (
                      <span className="inline-block bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5">
                        وفّر {discount}%
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug line-clamp-2">
                      {deal.product_name_ar}
                    </h3>
                    <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${storeInfo.bg} ${storeInfo.color} mb-2`}>
                      {STORE_LOGOS[deal.store_id] && (
                        <img src={STORE_LOGOS[deal.store_id]} alt="" className="h-3 w-auto" />
                      )}
                      {storeInfo.nameAr}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-emerald-600">
                        {deal.price} ج.م
                      </span>
                      {deal.old_price && (
                        <span className="text-sm text-gray-400 line-through">
                          {deal.old_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Product Categories */}
      {RAMADAN_CATEGORIES.map((cat) => {
        const items = grouped[cat.id];
        if (!items || items.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-xl font-black text-gray-900">{cat.nameAr}</h2>
              <span className="text-sm text-gray-400">
                ({items.length} منتج)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.slice(0, 8).map((product: any) => {
                const prices = product.prices || [];
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                  >
                    {/* Product Image */}
                    {product.image_url && (
                      <div className="w-full h-32 bg-gray-50 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.name_ar}
                          className="max-h-28 max-w-[80%] object-contain group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1 line-clamp-2">
                        {product.name_ar}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">
                        {product.brand || ""}{" "}
                        {product.unit ? `· ${product.unit}` : ""}
                      </p>
                      <div className="space-y-1.5">
                        {prices.slice(0, 3).map((p: any, idx: number) => {
                          const storeInfo = STORE_INFO[p.store_id] || { nameAr: p.store_id, color: "text-gray-600", bg: "bg-gray-50 border-gray-100" };
                          return (
                            <div
                              key={p.id}
                              className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs ${
                                idx === 0
                                  ? "bg-emerald-50 border border-emerald-100"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                {STORE_LOGOS[p.store_id] && (
                                  <img src={STORE_LOGOS[p.store_id]} alt="" className="h-3.5 w-auto" />
                                )}
                                <span className={`font-semibold ${idx === 0 ? "text-emerald-700" : "text-gray-600"}`}>
                                  {idx === 0 && (
                                    <svg className="inline w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                  )}
                                  {storeInfo.nameAr}
                                </span>
                              </span>
                              <span
                                className={`font-bold ${
                                  idx === 0
                                    ? "text-emerald-700"
                                    : "text-gray-700"
                                }`}
                              >
                                {p.price} ج.م
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* WhatsApp CTA Section */}
      <section className="bg-gradient-to-bl from-green-600 to-emerald-700 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                عايز تتابع أسعار رمضان يومياً؟
              </h2>
              <p className="text-emerald-100 max-w-lg">
                كلمنا على واتساب وهنبعتلك أحسن العروض والأسعار كل يوم الصبح.
                خدمة مجانية.
              </p>
            </div>
            <a
              href="https://wa.me/201034737110?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%AA%D8%A7%D8%A8%D8%B9%20%D8%B9%D8%B1%D9%88%D8%B6%20%D8%B1%D9%85%D8%B6%D8%A7%D9%86"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-green-700 font-bold py-4 px-8 rounded-2xl hover:bg-green-50 transition-colors shadow-lg text-lg shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1112 20z"/>
              </svg>
              كلمنا على واتساب
            </a>
          </div>
        </div>
      </section>

      {/* For Local Markets Section */}
      <section className="max-w-7xl mx-auto px-4 py-12" id="for-markets">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Right side - info */}
            <div className="p-6 md:p-10">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                فرصة للمحلات
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                عندك محل بقالة أو سوبرماركت؟
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                أضف عروضك على صح وصل لآلاف العملاء اللي بيدوّروا على أرخص الأسعار في منطقتهم. الخدمة مجانية خلال رمضان.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">كلمنا على واتساب</h4>
                    <p className="text-xs text-gray-500">ابعتلنا اسم المحل والعنوان</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">ابعتلنا عروضك</h4>
                    <p className="text-xs text-gray-500">صور أو قائمة بالأسعار — هنضيفها في نفس اليوم</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">وصّل لعملاء جداد</h4>
                    <p className="text-xs text-gray-500">عروضك هتظهر لكل الناس اللي بتدوّر على أسعار في منطقتك</p>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/201034737110?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B6%D9%8A%D9%81%20%D9%85%D8%AD%D9%84%D9%8A%20%D8%B9%D9%84%D9%89%20%D8%B5%D8%AD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1112 20z"/>
                </svg>
                سجّل محلك مجاناً
              </a>
            </div>
            {/* Left side - benefits */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10 flex items-center">
              <div className="space-y-4 w-full">
                <h3 className="font-bold text-gray-900 mb-4">ليه تضيف محلك على صح؟</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-900 mb-1">ظهور مجاني</div>
                  <p className="text-sm text-gray-500">محلك يظهر لكل الناس اللي بتدور على أسعار في منطقتك</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-900 mb-1">عملاء جداد</div>
                  <p className="text-sm text-gray-500">الناس بتقارن أسعار ولو عروضك أحسن هييجولك</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-900 mb-1">سهل ومجاني</div>
                  <p className="text-sm text-gray-500">مفيش رسوم — بس ابعتلنا عروضك على واتساب</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-bold text-gray-900 mb-1">تحديث في نفس اليوم</div>
                  <p className="text-sm text-gray-500">ابعتلنا الأسعار الجديدة وهنحدثها فوراً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Price Alerts Section */}
      <section className="max-w-7xl mx-auto px-4 py-16" id="price-alerts">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border border-amber-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>🔔</span>
                <span>تنبيه الأسعار</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">اعرف لما السعر ينزل</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">ابعتلنا اسم المنتج اللي عايز تتابعه على واتساب وهنبعتلك تنبيه لما سعره ينزل في أي متجر. وفّر وقتك وفلوسك!</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm">١</span>
                  <span className="text-gray-700">ابعتلنا رسالة على واتساب باسم المنتج</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm">٢</span>
                  <span className="text-gray-700">هنتابع السعر يومياً في كل المتاجر</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm">٣</span>
                  <span className="text-gray-700">هنبعتلك تنبيه فوري لما السعر ينزل</span>
                </div>
              </div>
              <a href="https://wa.me/201034737110?text=%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A7%D8%AA%D8%A7%D8%A8%D8%B9%20%D8%B3%D8%B9%D8%B1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.386-2.147l-.446-.349-3.1 1.04 1.04-3.1-.349-.446A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                تابع سعر منتج
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
              <h3 className="font-bold text-gray-800 mb-4 text-center">أمثلة على التنبيهات</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="font-bold text-green-800 text-sm">🔔 تنبيه سعر!</p>
                  <p className="text-green-700 text-sm">أرز بسمتي ٥ كيلو نزل من <span className="line-through">١٢٠ ج</span> لـ <span className="font-bold">٩٥ ج</span> في كارفور</p>
                  <p className="text-green-600 text-xs mt-1">وفّرت ٢٥ جنيه! 🎉</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="font-bold text-green-800 text-sm">🔔 تنبيه سعر!</p>
                  <p className="text-green-700 text-sm">زيت عباد الشمس ١ لتر نزل من <span className="line-through">٨٥ ج</span> لـ <span className="font-bold">٦٩ ج</span> في كازيون</p>
                  <p className="text-green-600 text-xs mt-1">وفّرت ١٦ جنيه! 🎉</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="font-bold text-green-800 text-sm">🔔 تنبيه سعر!</p>
                  <p className="text-green-700 text-sm">لبن كامل الدسم ١ لتر نزل من <span className="line-through">٣٥ ج</span> لـ <span className="font-bold">٢٨ ج</span> في سبينيز</p>
                  <p className="text-green-600 text-xs mt-1">وفّرت ٧ جنيه! 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="font-black text-lg text-gray-900 mb-4">
            أسعار رمضان ٢٠٢٦ في مصر
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              صح هو أول موقع مقارنة أسعار بقالة في مصر. بنتابع أسعار أكتر من{" "}
              {stats.totalProducts || 200} منتج يومياً من أكبر السلاسل التجارية
              زي كارفور وسبينيز وكازيون وخير زمان.
            </p>
            <p>
              هدفنا إنك تلاقي أرخص سعر لمستلزمات رمضان بسهولة — سواء أرز أو زيت
              أو لحوم أو عصائر. الأسعار بتتحدث كل يوم الساعة ٦ الصبح.
            </p>
            <p>
              لو عندك محل أو سوبرماركت، تقدر تضيف عروضك مجاناً على صح وتوصل
              لعملاء جداد في منطقتك. كلمنا على واتساب{" "}
              <a href="https://wa.me/201034737110" className="text-emerald-600 font-semibold hover:underline" dir="ltr" style={{display: "inline-block"}} target="_blank" rel="noopener noreferrer">+20 103 473 7110</a>
            </p>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/201034737110?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1112 20z"/>
        </svg>
      </a>

      <Footer />
    </div>
  );
}
