import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import Link from "next/link";
import { stores, getStoreProducts, prices, products } from "@/lib/data";

export function generateStaticParams() {
  return stores.map(s => ({ id: s.id }));
}

export default async function StorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const store = stores.find(s => s.id === id);
  const storeProducts = getStoreProducts(id);

  if (!store) {
    return <div className="min-h-screen flex items-center justify-center"><p>المتجر غير موجود</p></div>;
  }

  // Get deals for this store
  const storeDeals = prices.filter(p => p.storeId === id && p.oldPrice).length;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/stores" className="hover:text-emerald-600">المتاجر</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{store.nameAr}</span>
        </div>

        {/* Store Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ backgroundColor: store.color + '15' }}>
              {store.logo}
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">{store.nameAr}</h1>
              <p className="text-sm text-gray-500">{store.name} · {store.type === 'delivery' ? '🛵 خدمة توصيل' : '🏪 سلسلة سوبرماركت'}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="font-black text-xl text-gray-900">{storeProducts.length}</div>
              <div className="text-xs text-gray-500">منتج</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <div className="font-black text-xl text-orange-600">{storeDeals}</div>
              <div className="text-xs text-gray-500">عرض حالي</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <div className="font-black text-xl text-emerald-600">٦ ص</div>
              <div className="text-xs text-gray-500">آخر تحديث</div>
            </div>
          </div>
        </div>

        <h2 className="font-black text-lg text-gray-900 mb-4">جميع المنتجات في {store.nameAr}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {storeProducts.map(p => <PriceCard key={p.id} productId={p.id} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}
