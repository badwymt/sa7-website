import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صح | Sa7 - قارن أسعار البقالة في مصر",
  description: "قارن أسعار البقالة في كارفور وسبينيز وكازيون وخير زمان وطلبات وبريدفاست. اعرف أرخص مكان تشتري منه في ثواني.",
  keywords: "أسعار بقالة مصر, عروض كارفور, اسعار الارز, اسعار الزيت, مقارنة اسعار, grocery prices egypt",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00BFA5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
