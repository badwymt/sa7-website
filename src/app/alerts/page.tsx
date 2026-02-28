"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, getProductPrices } from "@/lib/data";

export default function AlertsPage() {
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && selectedProduct && targetPrice) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-gradient-to-bl from-emerald-600 to-teal-700 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📱</div>
          <h1 className="text-3xl font-black mb-3">تنبيه الأسعار عبر واتساب</h1>
          <p className="text-emerald-100 text-lg">اختار المنتج وحدد السعر اللي عايزه، واحنا هنبعتلك على الواتساب لما يوصل.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">تم تفعيل التنبيه!</h2>
            <p className="text-gray-500 mb-6">
              هنبعتلك على واتساب ({phone}) لما {products.find(p => p.id === selectedProduct)?.nameAr} يوصل لـ {targetPrice} ج.م أو أقل.
            </p>
            <button onClick={() => { setSubmitted(false); setPhone(""); setSelectedProduct(""); setTargetPrice(""); }} className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition">
              تنبيه على منتج تاني
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رقم الواتساب</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اختار المنتج</label>
                <select
                  value={selectedProduct}
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  required
                >
                  <option value="">اختار المنتج...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.nameAr} ({p.unit})</option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2">السعر الحالي:</p>
                  <div className="flex flex-wrap gap-2">
                    {getProductPrices(selectedProduct).slice(0, 3).map(ps => (
                      <span key={ps.storeId} className="bg-white text-xs px-3 py-1.5 rounded-lg border border-gray-200">
                        {ps.store.nameAr}: <span className="font-bold">{ps.price} ج.م</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نبّهني لما السعر يوصل لـ</label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={e => setTargetPrice(e.target.value)}
                    placeholder="مثال: 120"
                    className="w-full h-12 px-4 pl-16 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    dir="ltr"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ج.م</span>
                </div>
              </div>

              <button type="submit" className="w-full h-14 bg-emerald-600 text-white font-bold text-lg rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                <span>📱</span>
                <span>فعّل التنبيه على الواتساب</span>
              </button>

              <p className="text-xs text-center text-gray-400">مجاني تماماً · بنبعتلك رسالة واحدة بس لما السعر يوصل · مش هنزعجك</p>
            </div>
          </form>
        )}

        {/* How it works */}
        <div className="mt-10 mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-6 text-center">إزاي بيشتغل؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '١', icon: '📦', title: 'اختار المنتج', desc: 'اختار المنتج اللي عايز تتابع سعره' },
              { step: '٢', icon: '💰', title: 'حدد السعر', desc: 'اكتب السعر اللي تتمناه' },
              { step: '٣', icon: '📱', title: 'استنى الرسالة', desc: 'هنبعتلك على الواتساب لما السعر يوصل' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-bold text-gray-900 mb-1">{s.title}</div>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
