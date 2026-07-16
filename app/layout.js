import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://umkm-pandai-sikek.vercel.app"),
  title: {
    default: "UMKM Nagari Pandai Sikek — Direktori Usaha Lokal",
    template: "%s | UMKM Pandai Sikek",
  },
  description:
    "Direktori UMKM Nagari Pandai Sikek, Kec. X Koto, Kab. Tanah Datar, Sumatera Barat. Temukan berbagai produk dan usaha khas masyarakat Pandai Sikek.",
  keywords: [
    "UMKM Pandai Sikek",
    "produk lokal Pandai Sikek",
    "kerajinan Minangkabau",
    "kuliner Pandai Sikek",
    "songket Pandai Sikek",
    "Tanah Datar",
    "X Koto",
    "KKN",
  ],
  openGraph: {
    title: "UMKM Nagari Pandai Sikek — Direktori Usaha Lokal",
    description:
      "Jelajahi berbagai UMKM dan produk khas Nagari Pandai Sikek, Sumatera Barat.",
    type: "website",
    locale: "id_ID",
    images: ["/images/og-image.svg"],
  },
};

export const viewport = {
  themeColor: "#8B1A1A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body min-h-screen bg-gading antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
