import Image from "next/image";
import { formatRentangHarga } from "@/lib/format";

export default function ProductCard({ produk }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-xl hover:shadow-marun/10">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={produk.foto}
          alt={produk.nama}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        {/* Scrim halus saat hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marun-dark/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        {/* Pill harga mengambang */}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-marun shadow-sm shadow-black/10 backdrop-blur">
          {formatRentangHarga(produk.harga_min, produk.harga_max)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-heading text-base font-semibold leading-snug text-neutral-900 transition group-hover:text-marun">
          {produk.nama}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-sm text-neutral-600">
          {produk.deskripsi}
        </p>
      </div>
    </article>
  );
}
