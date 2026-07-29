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
  IconTikTok,
  IconShop,
  IconMapPin,
  IconClock,
  IconCheck,
  IconTruck,
  IconScissors,
  IconArrowRight,
  IconDirections,
  IconUser,
  IconCalendar,
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

  const sosial = [
    umkm.kontak.instagram && {
      href: `https://instagram.com/${umkm.kontak.instagram}`,
      icon: <IconInstagram className="h-4 w-4" />,
      label: "Instagram",
    },
    umkm.kontak.facebook && {
      href: `https://facebook.com/${umkm.kontak.facebook}`,
      icon: <IconFacebook className="h-4 w-4" />,
      label: "Facebook",
    },
    umkm.kontak.tokopedia && {
      href: `https://tokopedia.com/${umkm.kontak.tokopedia}`,
      icon: <IconShop className="h-4 w-4" />,
      label: "Tokopedia",
    },
    umkm.kontak.shopee && {
      href: `https://shopee.co.id/${umkm.kontak.shopee}`,
      icon: <IconShop className="h-4 w-4" />,
      label: "Shopee",
    },
    umkm.kontak.tiktok && {
      href: `https://tiktok.com/@${umkm.kontak.tiktok.replace(/\s+/g, "")}`,
      icon: <IconTikTok className="h-4 w-4" />,
      label: "TikTok",
    },
  ].filter(Boolean);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-black/5 bg-white">
        <div className="container flex items-center gap-2 py-4 text-sm text-neutral-500">
          <Link href="/" className="transition hover:text-marun">Beranda</Link>
          <span className="text-gold/60">/</span>
          <Link href="/umkm" className="transition hover:text-marun">UMKM</Link>
          <span className="text-gold/60">/</span>
          <span className="font-medium text-neutral-700">{umkm.nama}</span>
        </div>
      </div>

      <article className="container py-8 md:py-12">
        {/* ===== HERO: cover + judul melayang ===== */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl shadow-lg shadow-marun/10 ring-1 ring-black/5">
            <div className="relative h-[360px] w-full sm:h-[400px] lg:h-[460px]">
              <Image
                src={umkm.foto_utama}
                alt={umkm.nama}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {/* Scrim gradien agar teks di tengah terbaca jelas */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-marun-dark/90 via-black/20 to-black/40" />
              {/* Motif songket tipis */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, #fff 0, #fff 2px, transparent 2px, transparent 14px)",
                }}
              />
              {/* Garis emas atas */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark"
              />
            </div>

            {/* Konten melayang di tengah hero */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-marun-dark shadow-md shadow-black/25">
                {umkm.kategori}
              </span>
              <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight text-white drop-shadow-xl sm:text-5xl md:text-6xl text-balance">
                {umkm.nama}
              </h1>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-gold-light">
                <span className="inline-flex items-center gap-1.5 drop-shadow">
                  <IconMapPin className="h-5 w-5 shrink-0" />
                  Jorong {umkm.jorong}
                </span>
                <span className="inline-flex items-center gap-1.5 drop-shadow">
                  <IconCalendar className="h-5 w-5 shrink-0" />
                  Berdiri {umkm.tahun_berdiri}
                </span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ===== Deskripsi + kartu kontak ===== */}
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1.6fr_1fr] lg:gap-8">
          {/* Kiri: deskripsi, fakta, badge (panel putih agar seimbang dg kartu kanan) */}
          <Reveal delay={80} className="flex flex-col h-full">
            <div className="flex flex-1 flex-col rounded-2xl border border-gold/20 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-[15px] leading-relaxed text-neutral-700 sm:text-[16px]">
                {umkm.deskripsi}
              </p>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

              <div className="grid gap-3 sm:grid-cols-2">
                <FactCard
                  icon={<IconUser className="h-4 w-4" />}
                  label="Pemilik"
                  value={umkm.pemilik}
                />
                <FactCard
                  icon={<IconMapPin className="h-4 w-4" />}
                  label="Alamat"
                  value={umkm.alamat}
                />
              </div>

              {(umkm.layanan_kirim || umkm.terima_custom || umkm.bisa_dikunjungi) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {umkm.layanan_kirim && (
                    <Badge icon={<IconTruck className="h-3.5 w-3.5" />}>Layanan Kirim</Badge>
                  )}
                  {umkm.terima_custom && (
                    <Badge icon={<IconScissors className="h-3.5 w-3.5" />}>Terima Custom</Badge>
                  )}
                  {umkm.bisa_dikunjungi && (
                    <Badge icon={<IconCheck className="h-3.5 w-3.5" />}>Bisa Dikunjungi</Badge>
                  )}
                </div>
              )}
            </div>
          </Reveal>

          {/* Kanan: kartu kontak marun */}
          <Reveal delay={160}>
            <div className="lg:sticky lg:top-24">
              <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-marun via-marun to-marun-dark p-6 shadow-lg shadow-marun/25 sm:p-7">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/25 blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                />
                <div className="relative flex flex-col">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Hubungi Usaha Ini
                    </h3>
                    <p className="mt-1 text-sm text-gold-light/90">
                      Tanya produk, harga, atau kunjungan langsung.
                    </p>
                  </div>

                  <a
                    href={waLink(umkm.kontak.whatsapp, pesanWa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa mt-6 w-full shadow-md shadow-black/10"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    Hubungi via WhatsApp
                  </a>

                  {sosial.length > 0 && (
                    <div className="mt-5 border-t border-white/15 pt-5">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gold-light/70">
                        Media Sosial & Toko
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sosial.map((s) => (
                          <SocialLink key={s.label} href={s.href} icon={s.icon} label={s.label} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <SongketDivider className="my-12 md:my-14" />

        {/* ===== Lokasi & Jam ===== */}
        <Reveal delay={80}>
          <section className="grid items-stretch gap-8 lg:grid-cols-2">
            <div className="flex flex-col">
              <SectionHeading icon={<IconMapPin className="h-4 w-4" />} title="Lokasi" />
              <p className="mt-2 text-sm text-neutral-500">{umkm.alamat}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-gold/20 shadow-sm">
                <MapView points={[umkm]} zoom={15} className="h-72 md:h-80" />
              </div>
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

            <div className="flex flex-col">
              <SectionHeading icon={<IconClock className="h-4 w-4" />} title="Jam Operasional" />
              <p className="mt-2 text-sm text-neutral-500">Jadwal kunjungan setiap hari</p>
              <dl className="mt-4 overflow-hidden rounded-2xl border border-gold/20 bg-white text-sm shadow-sm">
                <JamRow hari="Senin – Jumat" jam={umkm.jam_buka.senin_jumat} />
                <JamRow hari="Sabtu" jam={umkm.jam_buka.sabtu} />
                <JamRow hari="Minggu" jam={umkm.jam_buka.minggu} last />
              </dl>

              <div className="mt-6 flex-1 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent p-5 text-sm shadow-sm">
                <h3 className="flex items-center gap-2.5 font-semibold text-neutral-800">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-marun to-marun-dark text-gold-light shadow-sm">
                    <IconTruck className="h-4 w-4" />
                  </span>
                  Info Pengiriman
                </h3>
                <p className="mt-3 text-neutral-600">
                  {umkm.layanan_kirim
                    ? "Melayani pengiriman ke seluruh Indonesia melalui ekspedisi. Hubungi via WhatsApp untuk estimasi ongkos kirim dan ketersediaan stok."
                    : "Saat ini belum melayani pengiriman. Silakan kunjungi langsung lokasi usaha."}
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <SongketDivider className="my-12 md:my-14" />

        {/* ===== Cerita ===== */}
        <Reveal>
          <section className="mx-auto flex max-w-3xl flex-col items-center">
            <p className="eyebrow accent-underline accent-underline-center justify-center">Kisah Usaha</p>
            <h2 className="mt-3 text-center font-heading text-2xl font-bold text-marun-dark md:text-3xl">
              Cerita di Balik {umkm.nama}
            </h2>
            <div className="mt-6 space-y-5 text-[15px] sm:text-[16px] leading-relaxed text-neutral-700 text-left sm:text-justify">
              {umkm.cerita
                .split("\n")
                .map((p) => p.trim())
                .filter(Boolean)
                .map((para, i) => {
                  return <p key={i}>{para}</p>;
                })}
            </div>

            {umkm.penghargaan?.length > 0 && (
              <div className="relative mt-8 w-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-gold/5 to-marun/5 p-6 text-center shadow-sm">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                />
                <h3 className="text-center font-heading text-lg font-semibold text-marun">
                  Penghargaan & Prestasi
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {umkm.penghargaan.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center gap-2.5 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm"
                    >
                      <IconCheck className="h-4 w-4 shrink-0 text-gold-dark" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </Reveal>

        <SongketDivider className="my-12 md:my-14" />

        {/* ===== Produk unggulan ===== */}
        <section>
          <Reveal>
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">Katalog</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-marun-dark md:text-3xl">
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

        <SongketDivider className="my-12 md:my-14" />

        {/* ===== Galeri ===== */}
        <Reveal>
          <section>
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">Dokumentasi</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-marun-dark md:text-3xl">
                Dokumentasi Galeri
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {semuaFoto.map((foto, i) => (
                <div
                  key={i}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-marun/10"
                >
                  <Image
                    src={foto}
                    alt={`Galeri ${umkm.nama} ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marun-dark/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>
              ))}
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

function SectionHeading({ icon, title }) {
  return (
    <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold text-marun-dark">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-marun to-marun-dark text-gold-light shadow-sm">
        {icon}
      </span>
      {title}
    </h2>
  );
}

function FactCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gold/[0.06] p-3.5 ring-1 ring-inset ring-gold/15">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-marun to-marun-dark text-gold-light shadow-sm">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold leading-snug text-neutral-800">{value}</dd>
      </div>
    </div>
  );
}

function Badge({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/12 px-2.5 py-1 text-xs font-medium text-gold-dark ring-1 ring-inset ring-gold/30">
      {icon}
      {children}
    </span>
  );
}

function InfoLine({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-light">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-light/60">
          {label}
        </p>
        <p className="text-sm font-medium leading-snug text-white">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-w-[7rem] flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/40 hover:bg-white/20"
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
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${tutup ? "bg-marun/10 text-marun" : "bg-emerald-500/10 text-emerald-700"
          }`}
      >
        {jam}
      </span>
    </div>
  );
}
