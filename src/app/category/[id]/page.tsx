import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/data";

export function generateStaticParams() {
  return categories.map(c => ({ id: c.id }));
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id);
  const prods = getProductsByCategory(id);

  if (!category) {
    return <div className="min-h-screen flex items-center justify-center"><p>القسم غير موجود</p></div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-emerald-600">الأقسام</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{category.nameAr}</span>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-l from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-black text-gray-900">{category.nameAr}</h1>
              <p className="text-sm text-gray-500">{category.nameEn} · {prods.length} منتج · أسعار محدثة اليوم</p>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {prods.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {prods.map(p => <PriceCard key={p.id} productId={p.id} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📦</div>
            <p className="font-semibold">قريبًا - جاري إضافة منتجات هذا القسم</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
