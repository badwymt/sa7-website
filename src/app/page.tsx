import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import Link from "next/link";
import { categories, products, deals, stores, trendingSearches, getProductPrices } from "@/lib/data";

export default function Home() {
  const topDeals = deals.filter(d => d.discount > 0).slice(0, 4);
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-bl from-emerald-600 via-teal-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
              <span>🔥</span>
              <span>عروض رمضان ٢٠٢٦ - الأسعار محدثة اليوم</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              قارن أسعار البقالة<br />في مصر في ثواني
            </h1>
            <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
              أول محرك مقارنة أسعار البقالة في مصر. اعرف أرخص مكان تشتري منه بين كارفور وسبينيز وكازيون وخير زمان وطلبات وبريدفاست.
            </p>

            {/* Search */}
            <div className="relative max-w-lg">
              <input
                type="text"
                placeholder="ابحث عن منتج... أرز، زيت، لبن، فراخ"
                className="w-full h-14 pr-12 pl-6 rounded-2xl bg-white text-gray-900 text-base shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
            </div>

            {/* Trending */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-emerald-200">الأكثر بحثاً:</span>
              {trendingSearches.slice(0, 6).map(t => (
                <span key={t} className="bg-white/10 backdrop-blur text-sm px-3 py-1 rounded-full hover:bg-white/20 cursor-pointer transition">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '٢٠+', label: 'منتج يتم تتبعه', icon: '📦' },
              { value: '٦', label: 'متاجر ومتاجر توصيل', icon: '🏪' },
              { value: '٦ ص', label: 'تحديث يومي', icon: '⏰' },
              { value: '٠ ج.م', label: 'مجاني تماماً', icon: '💚' },
            ].map(s => (
              <div key={s.label} className="text-center p-3">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-black text-xl text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">تصفح الأقسام</h2>
          <Link href="/categories" className="text-sm text-emerald-600 font-semibold hover:underline">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link href={`/category/${cat.id}`} key={cat.id} className="bg-white rounded-2xl p-4 text-center border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="font-bold text-sm text-gray-700 group-hover:text-emerald-600 transition">{cat.nameAr}</div>
              <div className="text-[10px] text-gray-400 mt-1">{cat.productCount} منتج</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="bg-gradient-to-l from-orange-50 to-red-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-black text-gray-900">عروض النهاردة</h2>
            </div>
            <Link href="/deals" className="text-sm text-orange-600 font-semibold hover:underline">كل العروض ←</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topDeals.map(deal => {
              const product = products.find(p => p.id === deal.productId);
              const store = stores.find(s => s.id === deal.storeId);
              if (!product || !store) return null;
              return (
                <Link href={`/product/${deal.productId}`} key={deal.id} className="bg-white rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    -{deal.discount}%
                  </div>
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{product.image}</div>
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-semibold">{deal.badge}</span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1 leading-snug">{product.nameAr}</h3>
                  <p className="text-xs text-gray-400 mb-2">{store.nameAr}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-emerald-600">{deal.salePrice} ج.م</span>
                    <span className="text-sm text-gray-400 line-through">{deal.originalPrice} ج.م</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">مقارنة الأسعار</h2>
          <Link href="/categories" className="text-sm text-emerald-600 font-semibold hover:underline">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featuredProducts.map(p => (
            <PriceCard key={p.id} productId={p.id} />
          ))}
        </div>
      </section>

      {/* Stores */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">المتاجر اللي بنتابعها</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {stores.map(store => (
              <Link href={`/store/${store.id}`} key={store.id} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group">
                <div className="text-3xl mb-2">{store.logo}</div>
                <div className="font-bold text-sm text-gray-700 group-hover:text-emerald-600">{store.nameAr}</div>
                <div className="text-[10px] text-gray-400 mt-1">{store.type === 'delivery' ? 'توصيل' : 'سوبرماركت'}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Price Alert */}
      <section className="bg-gradient-to-bl from-emerald-600 to-teal-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">عايز تعرف لما السعر ينزل؟</h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">سجل رقمك واحنا هنبعتلك على الواتساب لما المنتج اللي عايزه يوصل للسعر اللي انت محدده.</p>
          <Link href="/alerts" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition shadow-lg">
            <span>📱</span>
            <span>فعّل تنبيه الأسعار</span>
          </Link>
        </div>
      </section>

      {/* Inflation Banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-100">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-5xl">📊</div>
            <div>
              <h3 className="font-black text-lg text-gray-900 mb-2">التضخم في مصر ١١.٩٪ - اعرف فين الأرخص</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                أسعار الفراخ ارتفعت ١١.٦٪ والخضار ٨.٤٪. مع صح، تقدر تقارن الأسعار يومياً وتوفر فلوسك. الأسعار بتتحدث كل يوم الساعة ٦ الصبح.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-100">🍗 فراخ +١١.٦٪</div>
                <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-600 border border-orange-100">🥬 خضار +٨.٤٪</div>
                <div className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-600 border border-amber-100">📈 تضخم ١١.٩٪</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
