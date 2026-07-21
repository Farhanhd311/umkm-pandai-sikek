import Link from "next/link";
import Image from "next/image";
import UMKMCard from "@/components/UMKMCard";
import SongketDivider from "@/components/SongketDivider";
import Reveal from "@/components/Reveal";
import { IconArrowRight, IconMapPin, IconScissors, IconShop } from "@/components/Icons";
import { getUmkmUnggulan, getAllUmkm } from "@/lib/umkm";
import { site } from "@/lib/site";
import { waLink } from "@/lib/format";

export default function HomePage() {
  const unggulan = getUmkmUnggulan(3);
  const total = getAllUmkm().length;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-rumah-gadang.png"
            alt="Rumah Gadang Nagari Pandai Sikek"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-marun-dark/90 via-marun-dark/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gading to-transparent" />

        <div className="container relative z-10 py-24 text-center text-white">
          <p className="eyebrow justify-center text-gold-light animate-fade-in-up">
            Nagari Pandai Sikek · Tanah Datar
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance font-heading text-4xl font-bold leading-tight drop-shadow-md md:text-6xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/85 md:text-lg">
            Temukan berbagai produk dan usaha lokal unggulan dari pelaku
            UMKM Nagari Pandai Sikek, Kecamatan X Koto.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/umkm" className="btn-primary">
              Jelajahi UMKM
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/peta"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-marun"
            >
              <IconMapPin className="h-4 w-4" />
              Lihat Peta Lokasi
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ============ TENTANG NAGARI ============ */}
      <section className="container py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal duration={700}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/30 shadow-md">
              <Image
                src="/images/pandaisikek.jpg"
                alt="Nagari Pandai Sikek"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gold/50 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                <h3 className="font-heading text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl leading-tight">
                  Nagari Pandai Sikek
                </h3>
                <span className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold drop-shadow-md">
                  Kecamatan X Koto
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150} duration={700}>
            <p className="eyebrow accent-underline">Tentang Nagari</p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              Pandai Sikek, Nagari Kaya Karya
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-600">
              <p>
                Nagari Pandai Sikek terletak di lereng Gunung Singgalang,
                Kecamatan X Koto, Kabupaten Tanah Datar, Sumatera Barat. Nagari
                ini dikenal dengan kekayaan budaya dan keberagaman usaha lokal
                masyarakatnya, mulai dari kerajinan tangan, kuliner, hingga
                produk khas Minangkabau lainnya.
              </p>
              <p>
                Salah satu keunggulan utamanya adalah tenun songket dan ukiran
                kayu yang telah menjadi identitas budaya turun-temurun. Namun
                selain itu, banyak pula usaha kuliner, aksesoris, dan berbagai
                produk kreatif lainnya yang siap ditemukan di sini.
              </p>
              <p>
                Melalui direktori digital ini, seluruh pelaku UMKM Pandai Sikek
                dapat memperkenalkan produk dan jasa mereka kepada masyarakat
                luas, mendorong pertumbuhan ekonomi lokal secara menyeluruh.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
              <Stat icon={<IconScissors className="h-5 w-5" />} angka={`${total}+`} label="UMKM Terdaftar" />
              <Stat icon={<IconShop className="h-5 w-5" />} angka="20+" label="Produk Unggulan" />
              <Stat icon={<IconMapPin className="h-5 w-5" />} angka="4" label="Jorong" />
            </div>
          </Reveal>
        </div>
      </section>

      <SongketDivider />

      {/* ============ UMKM UNGGULAN ============ */}
      <section className="container py-20 md:py-28">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow accent-underline accent-underline-center justify-center">
              Pilihan Terbaik
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              UMKM Unggulan Pandai Sikek
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-neutral-600">
              Kenali para pelaku UMKM pilihan yang menjaga keberagaman produk
              dan budaya lokal Nagari Pandai Sikek tetap hidup.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unggulan.map((umkm, i) => (
            <Reveal key={umkm.id} delay={i * 100}>
              <UMKMCard umkm={umkm} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Link href="/umkm" className="btn-outline">
              Lihat Semua UMKM
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <Reveal>
        <section className="bg-marun-dark py-16 text-center text-gading md:py-20">
          <div className="container">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Punya usaha di Nagari Pandai Sikek?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-gading/85 md:text-base">
              Bergabunglah dalam direktori UMKM ini agar produk Anda dikenal lebih
              luas. Hubungi tim KKN atau pemerintah nagari untuk pendaftaran.
            </p>
            <a
              href={waLink(site.kontak.whatsapp, "Halo, saya ingin mendaftarkan UMKM saya ke direktori UMKM Pandai Sikek.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-marun-dark transition hover:bg-gold-light"
            >
              Daftarkan UMKM Anda
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </Reveal>
    </>
  );
}

function Stat({ icon, angka, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marun/10 text-marun">
        {icon}
      </span>
      <div>
        <p className="font-body text-3xl font-extrabold tracking-tight text-marun">{angka}</p>
        <p className="text-xs text-neutral-500">{label}</p>
      </div>
    </div>
  );
}
