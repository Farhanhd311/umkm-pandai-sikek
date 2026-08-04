import Link from "next/link";
import Image from "next/image";
import { IconMapPin, IconArrowRight, IconCheck } from "@/components/Icons";

export default function UMKMCard({ umkm }) {
  return (
    <article className="card group flex flex-col">
      <Link href={`/umkm/${umkm.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={umkm.foto_utama}
          alt={`Foto ${umkm.nama}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-marun/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {umkm.kategori}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold text-neutral-900">
          <Link href={`/umkm/${umkm.slug}`} className="transition hover:text-marun">
            {umkm.nama}
          </Link>
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
          <IconMapPin className="h-4 w-4 text-gold-dark" />
          Jorong {umkm.jorong}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {umkm.deskripsi}
        </p>

        {/* Info layanan singkat */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
          {umkm.layanan_kirim && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gading px-2.5 py-1">
              <IconCheck className="h-3.5 w-3.5 text-marun" /> Kirim
            </span>
          )}
          {umkm.terima_custom && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gading px-2.5 py-1">
              <IconCheck className="h-3.5 w-3.5 text-marun" /> Custom
            </span>
          )}
          {umkm.bisa_dikunjungi && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gading px-2.5 py-1">
              <IconCheck className="h-3.5 w-3.5 text-marun" /> Bisa dikunjungi
            </span>
          )}
        </div>

        <Link
          href={`/umkm/${umkm.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-marun transition group-hover:gap-2.5"
        >
          Lihat Detail
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
