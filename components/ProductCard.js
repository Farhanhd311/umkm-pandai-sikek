import Image from "next/image";
import { formatRentangHarga } from "@/lib/format";

export default function ProductCard({ produk }) {
  return (
    <article className="card flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={produk.foto}
          alt={produk.nama}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-heading text-base font-semibold leading-snug text-neutral-900">
          {produk.nama}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-sm text-neutral-600">
          {produk.deskripsi}
        </p>
        <p className="mt-3 text-sm font-semibold text-marun">
          {formatRentangHarga(produk.harga_min, produk.harga_max)}
        </p>
      </div>
    </article>
  );
}
