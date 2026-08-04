"use client";

import { useState } from "react";
import Image from "next/image";

// Galeri foto: gambar utama besar + thumbnail yang bisa dipilih.
export default function Gallery({ foto = [], alt = "Foto produk" }) {
  const daftar = foto.filter(Boolean);
  const [aktif, setAktif] = useState(0);
  if (daftar.length === 0) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <Image
          src={daftar[aktif]}
          alt={`${alt} ${aktif + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>

      {daftar.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {daftar.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setAktif(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                i === aktif
                  ? "border-marun"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Lihat foto ${i + 1}`}
              aria-current={i === aktif}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
