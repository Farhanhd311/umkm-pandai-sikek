import data from "@/data/umkm.json";

/** Kembalikan seluruh daftar UMKM. */
export function getAllUmkm() {
  return data.umkm;
}

/** Kembalikan daftar kategori produk. */
export function getKategori() {
  return data.kategori;
}

/** Cari satu UMKM berdasarkan slug. */
export function getUmkmBySlug(slug) {
  return data.umkm.find((u) => u.slug === slug) || null;
}

/** Kembalikan beberapa UMKM unggulan untuk preview di landing page. */
export function getUmkmUnggulan(jumlah = 3) {
  const featuredSlugs = ["fragaria-strawberry", "satu-karya", "panglima-tani"];
  const unggulan = featuredSlugs
    .map((slug) => data.umkm.find((u) => u.slug === slug))
    .filter(Boolean);

  if (unggulan.length < jumlah) {
    const sisa = data.umkm.filter((u) => !featuredSlugs.includes(u.slug));
    return [...unggulan, ...sisa].slice(0, jumlah);
  }

  return unggulan.slice(0, jumlah);
}

/**
 * Kumpulkan seluruh foto galeri + foto produk dari semua UMKM
 * menjadi satu array datar untuk halaman Galeri.
 */
export function getAllGaleri() {
  const items = [];
  for (const u of data.umkm) {
    for (const foto of u.galeri || []) {
      items.push({
        foto,
        umkmNama: u.nama,
        umkmSlug: u.slug,
        judul: `Karya ${u.nama}`,
      });
    }
    for (const p of u.produk_unggulan || []) {
      items.push({
        foto: p.foto,
        umkmNama: u.nama,
        umkmSlug: u.slug,
        judul: p.nama,
      });
    }
  }
  return items;
}

/** Data ringkas tiap UMKM untuk marker peta. */
export function getUmkmForPeta() {
  return data.umkm.map((u) => ({
    id: u.id,
    slug: u.slug,
    nama: u.nama,
    kategori: u.kategori,
    jorong: u.jorong,
    alamat: u.alamat,
    koordinat: u.koordinat,
    foto_utama: u.foto_utama,
  }));
}
