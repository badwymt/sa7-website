import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg">صح</div>
              <span className="font-bold text-white text-lg">Sa7</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              أول محرك مقارنة أسعار البقالة في مصر. قارن الأسعار بين كارفور وسبينيز وكازيون وخير زمان وطلبات وبريدفاست.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3 text-sm">الأقسام</h3>
            <div className="flex flex-col gap-2">
              <Link href="/category/rice" className="text-sm hover:text-emerald-400 transition">الأرز</Link>
              <Link href="/category/oil" className="text-sm hover:text-emerald-400 transition">الزيوت</Link>
              <Link href="/category/dairy" className="text-sm hover:text-emerald-400 transition">الألبان</Link>
              <Link href="/category/poultry" className="text-sm hover:text-emerald-400 transition">الدواجن</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3 text-sm">المتاجر</h3>
            <div className="flex flex-col gap-2">
              <Link href="/store/carrefour" className="text-sm hover:text-emerald-400 transition">كارفور مصر</Link>
              <Link href="/store/spinneys" className="text-sm hover:text-emerald-400 transition">سبينيز</Link>
              <Link href="/store/kazyon" className="text-sm hover:text-emerald-400 transition">كازيون</Link>
              <Link href="/store/breadfast" className="text-sm hover:text-emerald-400 transition">بريدفاست</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3 text-sm">روابط مهمة</h3>
            <div className="flex flex-col gap-2">
              <Link href="/deals" className="text-sm hover:text-emerald-400 transition">العروض</Link>
              <Link href="/alerts" className="text-sm hover:text-emerald-400 transition">تنبيه الأسعار</Link>
              <Link href="/about" className="text-sm hover:text-emerald-400 transition">من نحن</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Sa7 صح - جميع الحقوق محفوظة</p>
          <p className="text-xs text-gray-500">الأسعار يتم تحديثها يومياً الساعة ٦ صباحاً</p>
        </div>
      </div>
    </footer>
  );
}
