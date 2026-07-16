# Website UMKM Nagari Pandai Sikek

Direktori digital UMKM Nagari Pandai Sikek, Kecamatan X Koto, Kabupaten Tanah
Datar, Sumatera Barat. Dibangun dalam rangka program **KKN Universitas Andalas**.

Bertema **Modern Minimalis** dengan sentuhan identitas **Minangkabau**
(merah marun `#8B1A1A`, gold `#C9A84C`, latar putih gading `#FAFAF7`).

## Teknologi

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **React Leaflet** untuk peta interaktif (dimuat secara dinamis / SSR-safe)
- **next/font** — Playfair Display (judul) + Inter (isi)
- **next/image** untuk optimasi gambar

## Menjalankan

```bash
npm install       # instal dependensi
npm run dev       # mode pengembangan → http://localhost:3000
npm run build     # build produksi
npm run start     # jalankan hasil build
```

## Struktur Folder

```
app/                     # Halaman (App Router)
  layout.js              # Layout global (font, Navbar, Footer, metadata)
  page.js                # Landing page (/)
  umkm/page.js           # Direktori UMKM (/umkm)
  umkm/[slug]/page.js    # Detail UMKM (/umkm/<slug>)
  galeri/page.js         # Galeri (/galeri)
  peta/page.js           # Peta lokasi (/peta)
  tentang/page.js        # Tentang (/tentang)
  kontak/page.js         # Kontak (/kontak)
  not-found.js           # Halaman 404
  icon.svg               # Favicon
components/               # Komponen reusable
  Navbar.js, Footer.js, PageHeader.js
  UMKMCard.js, ProductCard.js, Gallery.js
  UmkmDirectory.js       # Search + filter (client)
  GaleriGrid.js          # Masonry + filter (client)
  MapView.js             # Wrapper peta (dynamic import, ssr:false)
  map/LeafletMap.js      # Implementasi React Leaflet (client)
  YouTubeEmbed.js        # Embed YouTube (mode background/responsive)
  KontakForm.js          # Form kontak (client)
  Icons.js               # Ikon SVG inline
lib/
  umkm.js                # Akses data UMKM
  format.js              # Format Rupiah, tautan WhatsApp
  site.js                # Konfigurasi situs (URL video hero, kontak, dll)
data/
  umkm.json              # Data UMKM (3 contoh) + daftar kategori
public/images/           # Gambar placeholder (SVG)
```

## Mengelola Data UMKM

Semua data UMKM ada di [`data/umkm.json`](data/umkm.json). Tambah/ubah entri di
sana; halaman akan otomatis mengikuti. Setiap UMKM memiliki field:

`id, slug, nama, pemilik, tahun_berdiri, alamat, jorong, koordinat{lat,lng},
kategori, deskripsi, cerita, produk_unggulan[], foto_utama, galeri[],
jam_buka{}, kontak{whatsapp,instagram,facebook,tokopedia},
bisa_dikunjungi, layanan_kirim, terima_custom, penghargaan[]`

> `slug` harus unik (dipakai untuk URL `/umkm/<slug>`), dan `koordinat`
> menentukan posisi marker pada halaman Peta.

## Mengganti Aset Placeholder

- **Gambar**: file di `public/images/*.svg` adalah placeholder. Ganti dengan
  foto asli (`.jpg`/`.png`/`.webp`) lalu perbarui path di `data/umkm.json`.
  Setelah tidak ada lagi SVG, Anda dapat mematikan `dangerouslyAllowSVG` di
  [`next.config.js`](next.config.js).
- **Video hero**: ubah `heroVideoUrl` di [`lib/site.js`](lib/site.js) dengan URL
  YouTube nagari.
- **Info kontak & KKN**: ubah di [`lib/site.js`](lib/site.js).

## Deploy ke Vercel

1. Push repositori ini ke GitHub.
2. Buka [vercel.com](https://vercel.com) → **New Project** → impor repo.
3. Framework terdeteksi otomatis sebagai **Next.js** — klik **Deploy**.
   Tidak ada variabel lingkungan yang diperlukan.

---

Dikembangkan oleh **Tim KKN Nagari Pandai Sikek** · Universitas Andalas.
