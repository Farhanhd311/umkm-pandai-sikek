"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function GaleriGrid({ items, umkmList }) {
  const [aktif, setAktif] = useState("Semua");

  const hasil = useMemo(() => {
    if (aktif === "Semua") return items;
    return items.filter((it) => it.umkmSlug === aktif);
  }, [items, aktif]);

  return (
    <div>
      {/* Filter per UMKM */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setAktif("Semua")}
          className={`chip ${aktif === "Semua" ? "chip-active" : ""}`}
        >
          Semua
        </button>
        {umkmList.map((u) => (
          <button
            key={u.slug}
            type="button"
            onClick={() => setAktif(u.slug)}
            className={`chip ${aktif === u.slug ? "chip-active" : ""}`}
          >
            {u.nama}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns */}
      <div className="mt-10 [column-gap:1.25rem] columns-2 md:columns-3 lg:columns-4">
        {hasil.map((it, i) => (
          <Reveal
            key={it.foto + i}
            as="figure"
            delay={Math.min(i * 60, 480)}
            className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
          >
            <Image
              src={it.foto}
              alt={it.judul}
              width={600}
              height={600}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{it.judul}</p>
              <Link
                href={`/umkm/${it.umkmSlug}`}
                className="pointer-events-auto text-xs text-gold-light underline underline-offset-2"
              >
                {it.umkmNama}
              </Link>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-neutral-500">
        {hasil.length} foto ditampilkan
      </p>
    </div>
  );
}
