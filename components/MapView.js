"use client";

import dynamic from "next/dynamic";

// React Leaflet mengakses `window`, jadi harus dimuat hanya di client (ssr: false).
const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gading">
      <div className="flex flex-col items-center gap-2 text-neutral-400">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <span className="text-sm">Memuat peta…</span>
      </div>
    </div>
  ),
});

/**
 * Pembungkus peta yang aman-SSR.
 * @param {Array} points - daftar titik { id, slug, nama, kategori, jorong, koordinat:{lat,lng} }
 * @param {number} zoom
 * @param {string} className - kelas untuk wadah (atur tinggi di sini)
 */
export default function MapView({ points = [], zoom = 14, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/10 ${className}`}
    >
      <LeafletMap points={points} zoom={zoom} />
    </div>
  );
}
