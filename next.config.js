/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Izinkan SVG placeholder yang kita buat sendiri di /public/images.
    // Ganti ke false setelah semua gambar diganti dengan foto asli (jpg/png/webp).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Contoh: izinkan gambar dari domain eksternal bila nanti dibutuhkan.
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
