import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SongketDivider from "@/components/SongketDivider";
import Reveal from "@/components/Reveal";
import { IconScissors, IconCheck } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata = {
  title: "Tentang",
  description:
    "Sejarah singkat Nagari Pandai Sikek serta informasi program KKN dan tim yang mengembangkan direktori UMKM ini.",
};

const TIM = [
  { nama: "Koordinator KKN", peran: "Ketua Kelompok" },
  { nama: "Divisi Data & Survei", peran: "Pendataan UMKM" },
  { nama: "Divisi Media & Dokumentasi", peran: "Foto & Konten" },
  { nama: "Divisi Teknologi", peran: "Pengembangan Website" },
];

const MISI = [
  "Mendata dan memetakan UMKM pengrajin di Nagari Pandai Sikek.",
  "Membuat direktori digital agar produk lebih mudah ditemukan.",
  "Meningkatkan literasi digital pelaku UMKM.",
  "Melestarikan keberagaman produk dan budaya lokal Nagari Pandai Sikek.",
];

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang"
        title="Tentang Nagari & Program KKN"
        description="Mengenal lebih dekat Nagari Pandai Sikek serta program KKN yang melahirkan direktori digital UMKM ini."
      />

      {/* Sejarah nagari */}
      <section className="container py-16 md:py-20">
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
                masyarakatnya yang meliputi berbagai sektor, mulai dari kerajinan
                tangan, kuliner, aksesoris, hingga produk kreatif lainnya.
              </p>
              <p>
                Kerajinan tenun songket dan ukiran kayu memang menjadi salah satu
                ikon nagari ini, namun kekayaan usaha masyarakat Pandai Sikek
                jauh lebih beragam dan terus berkembang dari generasi ke generasi.
              </p>
              <p>
                Melalui direktori digital ini, seluruh pelaku UMKM Pandai Sikek
                dari berbagai sektor dapat memperkenalkan produk dan jasa mereka
                kepada masyarakat luas, mendorong pertumbuhan ekonomi lokal
                secara menyeluruh.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SongketDivider />

      {/* Program KKN */}
      <section className="container py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal duration={700}>
            <div className="order-2 lg:order-1">
              <p className="eyebrow accent-underline">Program</p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900">
                Kuliah Kerja Nyata (KKN)
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
                Direktori UMKM ini dikembangkan sebagai salah satu program kerja
                mahasiswa <strong>{site.kkn.universitas}</strong> pada{" "}
                <strong>{site.kkn.periode}</strong> di Nagari Pandai Sikek.
                Tujuannya adalah membantu para pelaku UMKM memasarkan produk secara
                digital sekaligus melestarikan warisan budaya nagari.
              </p>

              <h3 className="mt-8 font-heading text-lg font-semibold text-marun">
                Misi Program
              </h3>
              <ul className="mt-4 space-y-2.5">
                {MISI.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150} duration={700}>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-gold/30 shadow-md">
                <Image
                  src="/images/tim-kkn.svg"
                  alt="Tim KKN Nagari Pandai Sikek"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tim */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">
                Tim Pelaksana
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900">
                Tim KKN Pandai Sikek {site.kkn.tahun}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
                Kolaborasi mahasiswa lintas divisi dalam mewujudkan direktori
                digital UMKM Nagari Pandai Sikek.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIM.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl border border-black/5 bg-gading p-6 text-center shadow-sm">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-marun/10 text-marun">
                    <IconScissors className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-heading font-semibold text-neutral-900">
                    {t.nama}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{t.peran}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
