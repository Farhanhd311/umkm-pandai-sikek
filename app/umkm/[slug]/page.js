import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import MapView from "@/components/MapView";
import SongketDivider from "@/components/SongketDivider";
import Reveal from "@/components/Reveal";
import {
  IconWhatsApp,
  IconInstagram,
  IconFacebook,
  IconShop,
  IconMapPin,
  IconClock,
  IconCheck,
  IconTruck,
  IconScissors,
  IconArrowRight,
  IconDirections,
} from "@/components/Icons";
import { getAllUmkm, getUmkmBySlug } from "@/lib/umkm";
import { waLink, gmapsDirectionUrl } from "@/lib/format";

export function generateStaticParams() {
  return getAllUmkm().map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }) {
  const umkm = getUmkmBySlug(params.slug);
  if (!umkm) return { title: "UMKM tidak ditemukan" };
  return {
    title: umkm.nama,
    description: umkm.deskripsi,
    openGraph: {
      title: umkm.nama,
      description: umkm.deskripsi,
      images: [umkm.foto_utama],
    },
  };
}

export default function DetailUmkmPage({ params }) {
  const umkm = getUmkmBySlug(params.slug);
  if (!umkm) notFound();

  const semuaFoto = [umkm.foto_utama, ...(umkm.galeri || [])];
  const pesanWa = `Halo ${umkm.nama}, saya menemukan usaha Anda di direktori UMKM Pandai Sikek dan tertarik dengan produk Anda.`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-black/5 bg-white">
        <div className="container flex items-center gap-2 py-4 text-sm text-neutral-500">
          <Link href="/" className="hover:text-marun">Beranda</Link>
          <span>/</span>
          <Link href="/umkm" className="hover:text-marun">UMKM</Link>
          <span>/</span>
          <span className="font-medium text-neutral-700">{umkm.nama}</span>
        </div>
      </div>

      <article className="container py-10 md:py-14">
        {/* Header Profil Utama - Centered & Full Width */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-marun/10 px-3 py-1 text-xs font-semibold text-marun">
            <IconScissors className="h-3.5 w-3.5" />
            {umkm.kategori}
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
            {umkm.nama}
          </h1>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
            <IconMapPin className="h-4 w-4 text-gold-dark" />
            Jorong {umkm.jorong} · Berdiri {umkm.tahun_berdiri}
          </p>

          <p className="mt-5 text-[16px] leading-relaxed text-neutral-600">
            {umkm.deskripsi}
          </p>
          </div>
        </Reveal>

        {/* Card Pemilik, Alamat, Badges & Kontak - Centered Below Header */}
        <Reveal delay={100}>
          <div className="mx-auto max-w-2xl mt-8 space-y-6">
          {/* Info pemilik + layanan */}
          <dl className="space-y-3 rounded-2xl border border-black/5 bg-white p-5 text-sm shadow-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Pemilik</dt>
              <dd className="text-right font-medium text-neutral-800">{umkm.pemilik}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Alamat</dt>
              <dd className="text-right font-medium text-neutral-800">{umkm.alamat}</dd>
            </div>
            <div className="flex flex-wrap justify-end gap-2 pt-1">
              {umkm.layanan_kirim && <Badge icon={<IconTruck className="h-3.5 w-3.5" />}>Layanan Kirim</Badge>}
              {umkm.terima_custom && <Badge icon={<IconScissors className="h-3.5 w-3.5" />}>Terima Custom</Badge>}
              {umkm.bisa_dikunjungi && <Badge icon={<IconCheck className="h-3.5 w-3.5" />}>Bisa Dikunjungi</Badge>}
            </div>
          </dl>

          {/* Tombol kontak */}
          <div className="flex flex-col gap-3">
            <a
              href={waLink(umkm.kontak.whatsapp, pesanWa)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa w-full"
            >
              <IconWhatsApp className="h-5 w-5" />
              Hubungi via WhatsApp
            </a>
            <div className="flex flex-wrap gap-2">
              {umkm.kontak.instagram && (
                <SocialLink href={`https://instagram.com/${umkm.kontak.instagram}`} icon={<IconInstagram className="h-4 w-4" />} label="Instagram" />
              )}
              {umkm.kontak.facebook && (
                <SocialLink href={`https://facebook.com/${umkm.kontak.facebook}`} icon={<IconFacebook className="h-4 w-4" />} label="Facebook" />
              )}
              {umkm.kontak.tokopedia && (
                <SocialLink href={`https://tokopedia.com/${umkm.kontak.tokopedia}`} icon={<IconShop className="h-4 w-4" />} label="Tokopedia" />
              )}
            </div>
          </div>
        </div>
      </Reveal>

        <SongketDivider className="my-14" />

        {/* Cerita UMKM */}
        <Reveal>
          <section className="mx-auto max-w-3xl flex flex-col items-center">
          <p className="eyebrow accent-underline accent-underline-center justify-center">Kisah Usaha</p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-neutral-900 md:text-3xl text-center">
            Cerita di Balik {umkm.nama}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 text-justify">
            {umkm.cerita}
          </p>

          {umkm.penghargaan?.length > 0 && (
            <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-6 w-full text-center">
              <h3 className="font-heading text-lg font-semibold text-marun text-center">
                Penghargaan & Prestasi
              </h3>
              <ul className="mt-3 space-y-2">
                {umkm.penghargaan.map((p, i) => (
                  <li key={i} className="flex items-center justify-center gap-2 text-sm text-neutral-700">
                    <IconCheck className="h-4 w-4 shrink-0 text-gold-dark" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </section>
        </Reveal>

        <SongketDivider className="my-14" />

        {/* Produk unggulan */}
        <section className="mt-16">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">Katalog</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Produk Unggulan
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {umkm.produk_unggulan.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <ProductCard produk={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <SongketDivider className="my-14" />

        {/* Dokumentasi Galeri */}
        <Reveal>
          <section className="mt-16">
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">Dokumentasi</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                Dokumentasi Galeri
              </h2>
            </div>
            <div className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {semuaFoto.map((foto, i) => (
                <div key={i} className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md">
                  <Image
                    src={foto}
                    alt={`Galeri ${umkm.nama} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Jam & lokasi */}
        <Reveal>
          <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-neutral-900">
              <IconClock className="h-5 w-5 text-marun" />
              Jam Operasional
            </h2>
            <dl className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white text-sm shadow-sm">
              <JamRow hari="Senin – Jumat" jam={umkm.jam_buka.senin_jumat} />
              <JamRow hari="Sabtu" jam={umkm.jam_buka.sabtu} />
              <JamRow hari="Minggu" jam={umkm.jam_buka.minggu} last />
            </dl>

            <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5 text-sm shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold text-neutral-800">
                <IconTruck className="h-5 w-5 text-marun" />
                Info Pengiriman
              </h3>
              <p className="mt-2 text-neutral-600">
                {umkm.layanan_kirim
                  ? "Melayani pengiriman ke seluruh Indonesia melalui ekspedisi. Hubungi via WhatsApp untuk estimasi ongkos kirim dan ketersediaan stok."
                  : "Saat ini belum melayani pengiriman. Silakan kunjungi langsung lokasi usaha."}
              </p>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-neutral-900">
              <IconMapPin className="h-5 w-5 text-marun" />
              Lokasi
            </h2>
            <p className="mt-2 text-sm text-neutral-500">{umkm.alamat}</p>
            <MapView
              points={[umkm]}
              zoom={15}
              className="mt-4 h-72 md:h-80"
            />
            <a
              href={gmapsDirectionUrl(umkm.koordinat.lat, umkm.koordinat.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 w-full"
            >
              <IconDirections className="h-5 w-5" />
              Rute ke Lokasi (Google Maps)
            </a>
          </div>
          </section>
        </Reveal>

        {/* Kembali */}
        <Reveal>
          <div className="mt-14 text-center">
            <Link href="/umkm" className="btn-outline">
              <IconArrowRight className="h-4 w-4 rotate-180" />
              Kembali ke Direktori UMKM
            </Link>
          </div>
        </Reveal>
      </article>
    </>
  );
}

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gading px-2.5 py-1 text-xs font-medium text-neutral-700">
      {icon}
      {children}
    </span>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-marun hover:text-marun"
    >
      {icon}
      {label}
    </a>
  );
}

function JamRow({ hari, jam, last }) {
  const tutup = /tutup/i.test(jam);
  return (
    <div className={`flex items-center justify-between px-5 py-3 ${last ? "" : "border-b border-black/5"}`}>
      <span className="text-neutral-600">{hari}</span>
      <span className={`font-medium ${tutup ? "text-red-600" : "text-neutral-800"}`}>{jam}</span>
    </div>
  );
}
