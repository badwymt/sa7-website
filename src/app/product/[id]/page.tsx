"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { products, stores, categories, getProductPrices, generatePriceHistory } from "@/lib/data";
import { use } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const category = product ? categories.find(c => c.id === product.category) : null;
  const pricedStores = product ? getProductPrices(id) : [];
  const cheapest = pricedStores[0];
  const mostExpensive = pricedStores[pricedStores.length - 1];
  const [alertPhone, setAlertPhone] = useState("");
  const [alertPrice, setAlertPrice] = useState("");
  const [alertSet, setAlertSet] = useState(false);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center"><p>المنتج غير موجود</p></div>;
  }

  const savings = mostExpensive && cheapest ? mostExpensive.price - cheapest.price : 0;
  const savingsPct = mostExpensive ? Math.round((savings / mostExpensive.price) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-emerald-600">الرئيسية</Link>
          <span>/</span>
          {category && <><Link href={`/category/${category.id}`} className="hover:text-emerald-600">{category.nameAr}</Link><span>/</span></>}
          <span className="text-gray-900 font-semibold">{product.nameAr}</span>
        </div>

        {/* Product Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{product.image}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-gray-900 mb-1">{product.nameAr}</h1>
              <p className="text-gray-500 text-sm mb-3">{product.nameEn} · {product.brand} · {product.unit}</p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2">
                  <div className="text-xs text-emerald-600 mb-0.5">أرخص سعر</div>
                  <div className="font-black text-xl text-emerald-700">{cheapest?.price} ج.م</div>
                  <div className="text-xs text-emerald-600">{cheapest?.store.nameAr}</div>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                  <div className="text-xs text-red-500 mb-0.5">أغلى سعر</div>
                  <div className="font-black text-xl text-red-600">{mostExpensive?.price} ج.م</div>
                  <div className="text-xs text-red-500">{mostExpensive?.store.nameAr}</div>
                </div>
                {savingsPct > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2">
                    <div className="text-xs text-amber-600 mb-0.5">ممكن توفّر</div>
                    <div className="font-black text-xl text-amber-700">{savings} ج.م</div>
                    <div className="text-xs text-amber-600">{savingsPct}% فرق</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Price Comparison */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-black text-lg text-gray-900">مقارنة الأسعار في جميع المتاجر</h2>
            <p className="text-xs text-gray-400">آخر تحديث: اليوم الساعة ٦ صباحاً</p>
          </div>
          <div className="divide-y divide-gray-50">
            {pricedStores.map((ps, idx) => {
              const isFirst = idx === 0;
              const priceDiff = cheapest ? ps.price - cheapest.price : 0;
              return (
                <div key={ps.storeId} className={`flex items-center justify-between px-6 py-4 ${isFirst ? 'bg-emerald-50/50' : 'hover:bg-gray-50'} transition`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ps.store.logo}</span>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{ps.store.nameAr}</div>
                      <div className="text-xs text-gray-400">{ps.store.type === 'delivery' ? '🛵 توصيل' : '🏪 سوبرماركت'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {ps.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{ps.oldPrice} ج.م</span>
                    )}
                    <span className={`font-black text-lg ${isFirst ? 'text-emerald-700' : 'text-gray-900'}`}>{ps.price} ج.م</span>
                    {isFirst ? (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">الأرخص ✓</span>
                    ) : (
                      <span className="text-xs text-red-400 font-semibold">+{priceDiff} ج.م</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price History Chart (simplified visual) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-6">
          <h2 className="font-black text-lg text-gray-900 mb-4">📈 تاريخ السعر (آخر ٣٠ يوم)</h2>
          <div className="h-48 bg-gradient-to-t from-emerald-50 to-white rounded-xl border border-gray-100 flex items-end justify-between px-4 pb-4 pt-8 gap-1 overflow-hidden relative">
            <div className="absolute top-3 right-4 text-xs text-gray-400">
              أقل سعر: {cheapest?.price} ج.م · أعلى سعر: {mostExpensive?.price} ج.م
            </div>
            {Array.from({ length: 30 }, (_, i) => {
              const height = 30 + Math.sin(i * 0.3) * 20 + Math.random() * 15;
              const isToday = i === 29;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${isToday ? 'bg-emerald-500' : 'bg-emerald-200'} transition-all min-w-[4px]`}
                  style={{ height: `${height}%` }}
                  title={isToday ? 'اليوم' : `قبل ${30 - i} يوم`}
                />
              );
            })}
          </div>
        </div>

        {/* Set Price Alert */}
        <div className="bg-gradient-to-l from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
          <h2 className="font-black text-lg text-gray-900 mb-2">📱 تنبيه الأسعار</h2>
          <p className="text-sm text-gray-500 mb-4">هنبعتلك على الواتساب لما {product.nameAr} يوصل للسعر اللي انت عايزه.</p>
          {alertSet ? (
            <div className="bg-emerald-500 text-white rounded-xl p-4 text-center">
              <span className="text-2xl block mb-2">✅</span>
              <p className="font-bold">تم تفعيل التنبيه بنجاح!</p>
              <p className="text-sm text-emerald-100">هنبعتلك لما السعر ينزل تحت {alertPrice} ج.م</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                value={alertPhone}
                onChange={e => setAlertPhone(e.target.value)}
                placeholder="رقم الواتساب (01xxxxxxxxx)"
                className="flex-1 h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                dir="ltr"
              />
              <input
                type="number"
                value={alertPrice}
                onChange={e => setAlertPrice(e.target.value)}
                placeholder={`السعر المطلوب (مثال: ${cheapest ? cheapest.price - 10 : 50})`}
                className="w-full sm:w-40 h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                dir="ltr"
              />
              <button
                onClick={() => alertPhone && alertPrice && setAlertSet(true)}
                className="h-12 px-6 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition whitespace-nowrap"
              >
                فعّل التنبيه
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
