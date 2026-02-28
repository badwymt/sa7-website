import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { deals, products, stores } from "@/lib/data";

export default function DealsPage() {
  const validDeals = deals.filter(d => d.discount > 0);

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero */}
      <div className="bg-gradient-to-l from-orange-500 to-red-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-black mb-2">🔥 عروض النهاردة</h1>
          <p className="text-orange-100">أحدث العروض والتخفيضات من جميع المتاجر. محدثة يومياً.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter by store */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-full">الكل</span>
          {stores.map(s => (
            <span key={s.id} className="bg-white text-gray-700 text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 hover:border-emerald-300 cursor-pointer transition">
              {s.logo} {s.nameAr}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {validDeals.map(deal => {
            const product = products.find(p => p.id === deal.productId);
            const store = stores.find(s => s.id === deal.storeId);
            if (!product || !store) return null;
            return (
              <Link href={`/product/${deal.productId}`} key={deal.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative">
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                  -{deal.discount}%
                </div>
                <div className="p-5 pb-3 text-center">
                  <div className="text-5xl mb-3">{product.image}</div>
                  <span className="inline-block text-[11px] bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full font-semibold">{deal.badge}</span>
                </div>
                <div className="px-5 pb-5">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 group-hover:text-emerald-600 transition leading-snug">{product.nameAr}</h3>
                  <p className="text-xs text-gray-400 mb-3">{store.logo} {store.nameAr}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-lg text-emerald-600">{deal.salePrice} ج.م</span>
                      <span className="text-sm text-gray-400 line-through mr-2">{deal.originalPrice}</span>
                    </div>
                    <span className="text-xs text-gray-400">حتى {new Date(deal.endsAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {validDeals.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🏷️</div>
            <p className="font-semibold text-lg">لا توجد عروض حالياً</p>
            <p className="text-sm">ارجع بكرة الصبح - بنحدث العروض يومياً الساعة ٦</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
