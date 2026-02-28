import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { stores, prices } from "@/lib/data";

export default function StoresPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-2">المتاجر</h1>
        <p className="text-sm text-gray-500 mb-8">بنتابع أسعار المنتجات في المتاجر دي يومياً</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map(store => {
            const productCount = new Set(prices.filter(p => p.storeId === store.id).map(p => p.productId)).size;
            const dealCount = prices.filter(p => p.storeId === store.id && p.oldPrice).length;
            return (
              <Link href={`/store/${store.id}`} key={store.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: store.color + '15' }}>
                    {store.logo}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition">{store.nameAr}</h2>
                    <p className="text-xs text-gray-400">{store.name}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <div className="font-bold text-lg text-gray-900">{productCount}</div>
                    <div className="text-xs text-gray-500">منتج</div>
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-xl p-3 text-center">
                    <div className="font-bold text-lg text-orange-600">{dealCount}</div>
                    <div className="text-xs text-gray-500">عرض</div>
                  </div>
                  <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
                    <div className="font-bold text-sm text-emerald-600">{store.type === 'delivery' ? '🛵' : '🏪'}</div>
                    <div className="text-xs text-gray-500">{store.type === 'delivery' ? 'توصيل' : 'فرع'}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
