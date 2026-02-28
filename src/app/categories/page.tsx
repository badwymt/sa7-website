import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-2">جميع الأقسام</h1>
        <p className="text-sm text-gray-500 mb-8">تصفح أسعار البقالة حسب القسم. الأسعار محدثة يومياً.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link href={`/category/${cat.id}`} key={cat.id} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all group">
              <div className="text-5xl mb-3">{cat.icon}</div>
              <div className="font-bold text-base text-gray-800 group-hover:text-emerald-600 transition mb-1">{cat.nameAr}</div>
              <div className="text-xs text-gray-400">{cat.nameEn}</div>
              <div className="text-xs text-emerald-600 font-semibold mt-2">{cat.productCount} منتج</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
