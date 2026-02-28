"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
              صح
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-gray-900 leading-tight">Sa7</div>
              <div className="text-xs text-gray-500 -mt-1">أسعار البقالة في مصر</div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن منتج... أرز، زيت، لبن"
                className="w-full h-10 pr-10 pl-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">الرئيسية</Link>
            <Link href="/categories" className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">الأقسام</Link>
            <Link href="/deals" className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">العروض 🔥</Link>
            <Link href="/stores" className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">المتاجر</Link>
            <Link href="/alerts" className="px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition">تنبيه الأسعار</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 border-t border-gray-100 pt-2">
            <Link href="/" className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">الرئيسية</Link>
            <Link href="/categories" className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">الأقسام</Link>
            <Link href="/deals" className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">العروض 🔥</Link>
            <Link href="/stores" className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100">المتاجر</Link>
            <Link href="/alerts" className="px-4 py-3 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700">تنبيه الأسعار</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
