import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-xl">صح</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">عن صح | Sa7</h1>
          <p className="text-gray-500">أول محرك مقارنة أسعار البقالة في مصر</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-2">المشكلة</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              التضخم في مصر وصل ١١.٩٪ وأسعار الأكل بتزيد كل يوم. الفراخ زادت ١١.٦٪ والخضار ٨.٤٪. كل يوم الست المصرية بتفتح ٣-٤ تطبيقات عشان تقارن الأسعار وتوفر. مفيش مكان واحد يقولها أرخص مكان تشتري منه.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-gray-900 mb-2">الحل</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              صح بيجمعلك أسعار البقالة من كارفور وسبينيز وكازيون وخير زمان وطلبات وبريدفاست في مكان واحد. بنحدث الأسعار كل يوم الساعة ٦ الصبح عن طريق تقنية الـ web scraping. كل اللي عليك تبحث عن المنتج وتشوف أرخص مكان.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-gray-900 mb-2">إزاي بنشتغل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-bold text-sm text-gray-900">جمع الأسعار تلقائياً</div>
                <p className="text-xs text-gray-500 mt-1">بنستخدم scrapers أوتوماتيك بتجمع الأسعار من كل المتاجر يومياً</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-bold text-sm text-gray-900">مقارنة فورية</div>
                <p className="text-xs text-gray-500 mt-1">بنعرضلك الأسعار جنب بعض عشان تقارن وتختار الأرخص</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-bold text-sm text-gray-900">تنبيهات واتساب</div>
                <p className="text-xs text-gray-500 mt-1">سجل رقمك واحنا هنبعتلك لما السعر ينزل</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
            <h2 className="text-lg font-black text-gray-900 mb-2">⚠️ ملاحظة مهمة</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              الأسعار المعروضة هنا تقريبية ومبنية على آخر تحديث. الأسعار الفعلية ممكن تختلف حسب الفرع أو التطبيق. صح مش مسؤول عن أي فروقات في الأسعار. دايماً تأكد من السعر النهائي قبل الشراء.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
