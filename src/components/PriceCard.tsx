import Link from "next/link";
import { products, getProductPrices, stores } from "@/lib/data";

export default function PriceCard({ productId }: { productId: string }) {
  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const pricedStores = getProductPrices(productId);
  const cheapest = pricedStores[0];
  const mostExpensive = pricedStores[pricedStores.length - 1];
  const savings = mostExpensive && cheapest ? mostExpensive.price - cheapest.price : 0;
  const savingsPercent = mostExpensive && cheapest ? Math.round((savings / mostExpensive.price) * 100) : 0;

  return (
    <Link href={`/product/${productId}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1">
              <div className="text-3xl mb-2">{product.image}</div>
              <h3 className="font-bold text-sm text-gray-900 leading-snug mb-1 group-hover:text-emerald-600 transition">{product.nameAr}</h3>
              <p className="text-xs text-gray-400">{product.brand} · {product.unit}</p>
            </div>
            {savingsPercent > 0 && (
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                وفّر {savingsPercent}%
              </span>
            )}
          </div>

          {/* Price comparison strip */}
          <div className="space-y-1.5">
            {pricedStores.slice(0, 3).map((ps, idx) => (
              <div key={ps.storeId} className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg text-xs ${idx === 0 ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-1.5">
                  {idx === 0 && <span className="text-emerald-600 font-bold">✓</span>}
                  <span className={`font-semibold ${idx === 0 ? 'text-emerald-700' : 'text-gray-600'}`}>{ps.store.nameAr}</span>
                </div>
                <div className="flex items-center gap-2">
                  {ps.oldPrice && (
                    <span className="line-through text-gray-400 text-[10px]">{ps.oldPrice} ج.م</span>
                  )}
                  <span className={`font-bold ${idx === 0 ? 'text-emerald-700' : 'text-gray-700'}`}>{ps.price} ج.م</span>
                </div>
              </div>
            ))}
            {pricedStores.length > 3 && (
              <p className="text-center text-[10px] text-gray-400 pt-1">+{pricedStores.length - 3} متاجر أخرى</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
