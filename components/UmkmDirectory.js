"use client";

import { useMemo, useState } from "react";
import UMKMCard from "@/components/UMKMCard";
import Reveal from "@/components/Reveal";
import { IconSearch } from "@/components/Icons";

export default function UmkmDirectory({ umkm, kategori }) {
  const [query, setQuery] = useState("");
  const [aktif, setAktif] = useState("Semua");

  const kategoriList = ["Semua", ...kategori];

  const hasil = useMemo(() => {
    const q = query.trim().toLowerCase();
    return umkm.filter((u) => {
      const cocokKategori = aktif === "Semua" || u.kategori === aktif;
      if (!cocokKategori) return false;
      if (!q) return true;
      // Cari di nama usaha, deskripsi, dan nama produk.
      const haystack = [
        u.nama,
        u.deskripsi,
        u.kategori,
        u.jorong,
        ...(u.produk_unggulan || []).map((p) => p.nama),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [umkm, query, aktif]);

  return (
    <div>
      {/* Kontrol: search + filter */}
      <div className="flex flex-col gap-5">
        <div className="relative mx-auto w-full max-w-xl">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama UMKM atau produk…"
            className="w-full rounded-full border border-black/10 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
            aria-label="Cari UMKM"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {kategoriList.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setAktif(k)}
              className={`chip ${aktif === k ? "chip-active" : ""}`}
              aria-pressed={aktif === k}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Info jumlah hasil */}
      <p className="mt-8 text-center text-sm text-neutral-500">
        Menampilkan <span className="font-semibold text-marun">{hasil.length}</span>{" "}
        UMKM
        {aktif !== "Semua" && ` · kategori ${aktif}`}
        {query && ` · pencarian "${query}"`}
      </p>

      {/* Grid hasil */}
      {hasil.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((u, i) => (
            <Reveal key={u.id} delay={Math.min(i * 60, 480)}>
              <UMKMCard umkm={u} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-black/15 bg-white/50 py-16 text-center">
          <p className="font-heading text-lg font-semibold text-neutral-700">
            Tidak ada UMKM yang cocok
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Coba kata kunci lain atau ubah filter kategori.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setAktif("Semua");
            }}
            className="btn-outline mt-6"
          >
            Atur ulang filter
          </button>
        </div>
      )}
    </div>
  );
}
