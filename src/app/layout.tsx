import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صح | Sa7 - قارن أسعار البقالة في مصر",
  description:
    "قارن أسعار البقالة في كارفور وسبينيز وكازيون وخير زمان وطلبات وبريدفاست. اعرف أرخص مكان تشتري منه في ثواني.",
  keywords:
    "أسعار بقالة مصر, عروض كارفور, اسعار الارز, اسعار الزيت, مقارنة اسعار, grocery prices egypt, عروض رمضان",
  openGraph: {
    title: "صح Sa7 — أول موقع مقارنة أسعار بقالة في مصر",
    description:
      "قارن أسعار أكتر من 200 منتج بقالة يومياً بين كارفور وسبينيز وكازيون وخير زمان. وفّر فلوسك في رمضان.",
    url: "https://sa7-website.vercel.app",
    siteName: "صح Sa7",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "صح Sa7 — قارن أسعار البقالة في مصر",
    description:
      "تابع أسعار رمضان يومياً. الأرز والزيت واللحوم والعصائر — اعرف أرخص مكان.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sa7-website.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6D28D9" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
