import Image from "next/image";
import SongketDivider from "@/components/SongketDivider";
import Reveal from "@/components/Reveal";
import { IconCheck, IconUser, IconMapPin, IconShop, IconTruck } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata = {
  title: "Tentang Program KKN",
  description:
    "Informasi tim KKN Universitas Andalas dan Penanggung Jawab pengembang direktori digital UMKM Nagari Pandai Sikek.",
};

const MISI = [
  "Mendata dan memetakan pelaku UMKM di seluruh jorong Nagari Pandai Sikek.",
  "Membangun platform direktori digital interaktif yang mudah diakses publik.",
  "Meningkatkan daya saing dan jangkauan pemasaran produk lokal secara digital.",
  "Mempermudah wisatawan dan calon pembeli menemukan lokasi serta kontak resmi UMKM.",
];

const PILAR_PROGRAM = [
  {
    judul: "Pendataan Digital UMKM",
    deskripsi:
      "Mengumpulkan data rinci mulai dari profil usaha, produk unggulan, galeri foto, hingga kontak resmi seluruh UMKM di Nagari Pandai Sikek.",
    icon: IconShop,
  },
  {
    judul: "Peta Interaktif GIS",
    deskripsi:
      "Integrasi peta spasial berbasis koordinat presisi Google Maps untuk membantu navigasi pengunjung menuju lokasi UMKM.",
    icon: IconMapPin,
  },
  {
    judul: "Konektivitas Langsung",
    deskripsi:
      "Memfasilitasi pembeli untuk berkomunikasi dan bertransaksi langsung dengan pemilik UMKM tanpa perantara via WhatsApp & Media Sosial.",
    icon: IconTruck,
  },
];

const PENANGGUNG_JAWAB = {
  nama: "Farhan Fitrahadi",
  nim: "2311522037",
  jurusan: "Sistem Informasi",
  fakultas: "Teknologi Informasi",
  universitas: "Universitas Andalas (UNAND)",
  peran: "Penanggung Jawab Website & Digitalisasi UMKM",
  foto: "/images/farhan.jpeg",
};

export default function TentangPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden md:min-h-[65vh]">
        {/* Background Photo — geser ke atas 35% agar orang lebih terlihat */}
        <div className="absolute inset-0">
          <Image
            src="/images/herokkn1.jpeg"
            alt="Tim KKN Nagari Pandai Sikek"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
        {/* Brand color fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-marun-dark/85 via-marun-dark/25 to-transparent" />
        {/* Gading blend to page background */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gading to-transparent" />

        {/* Text Content */}
        <div className="container relative z-10 pb-10 pt-24 text-white md:pb-16 md:pt-36">
          <p className="eyebrow justify-start text-gold-light animate-fade-in-up text-[10px] tracking-[0.2em] md:text-xs">
            Program KKN · Universitas Andalas
          </p>
          <h1 className="mt-2 max-w-3xl font-heading text-2xl font-bold leading-tight drop-shadow-md sm:text-3xl md:text-5xl">
            Tim KKN &amp; Penanggung Jawab
          </h1>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/80 sm:text-sm md:mt-3 md:max-w-2xl md:text-base">
            Mengenal program Kuliah Kerja Nyata (KKN) Universitas Andalas di Nagari Pandai Sikek
            serta Penanggung Jawab pengembangan direktori UMKM digital ini.
          </p>
        </div>
      </section>

      {/* Program KKN Overview */}
      <section className="container py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal duration={700}>
            <div className="order-2 lg:order-1">
              <p className="eyebrow accent-underline">Program KKN</p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Digitalisasi UMKM Nagari Pandai Sikek
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 text-justify">
                Website Direktori UMKM ini dikembangkan sebagai salah satu program kerja utama
                mahasiswa <strong>{site.kkn.universitas}</strong> dalam kegiatan{" "}
                <strong>{site.kkn.periode}</strong> di Nagari Pandai Sikek.
                Program ini bertujuan memodernisasi pemasaran usaha lokal masyarakat melalui media digital secara berkelanjutan.
              </p>

              <h3 className="mt-8 font-heading text-lg font-semibold text-marun">
                Fokus Utama Program
              </h3>
              <ul className="mt-4 space-y-3">
                {MISI.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-marun/10 text-marun mt-0.5">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-justify">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150} duration={700}>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl border border-gold/30 shadow-lg">
                <Image
                  src="/images/tim-kkn.jpg"
                  alt="Tim KKN Nagari Pandai Sikek"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  style={{ objectPosition: "25% top" }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SongketDivider />

      {/* Penanggung Jawab Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow accent-underline accent-underline-center justify-center">
                Penanggung Jawab
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                Penanggung Jawab Website
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-neutral-500">
                Mahasiswa pengembang dan penanggung jawab teknis platform direktori digital UMKM Pandai Sikek.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-3xl">
              <Reveal delay={100}>
                <div className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-gading p-8 shadow-xl transition hover:border-gold hover:shadow-2xl md:p-10">
                  {/* Decorative Background Accent */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl transition group-hover:bg-gold/20" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-marun/10 blur-3xl" />

                  <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-center">
                    {/* Profile Photo - Perfectly Symmetrical Height */}
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div className="relative h-52 w-52 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-lg ring-4 ring-gold/10 md:h-[240px] md:w-[200px]">
                        <Image
                          src={PENANGGUNG_JAWAB.foto}
                          alt={PENANGGUNG_JAWAB.nama}
                          fill
                          sizes="240px"
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-marun px-3.5 py-1 text-[11px] font-semibold tracking-wider text-white shadow-md uppercase">
                        PJ Website
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-3 py-1 text-xs font-semibold text-marun">
                        <IconUser className="h-3.5 w-3.5" />
                        <span>Mahasiswa KKN UNAND 2026</span>
                      </div>

                      <h3 className="mt-3 font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
                        {PENANGGUNG_JAWAB.nama}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-gold-dark">
                        NIM: {PENANGGUNG_JAWAB.nim}
                      </p>

                      <div className="mt-5 space-y-2.5 rounded-2xl border border-black/5 bg-white p-4 text-xs text-neutral-700 shadow-sm md:text-sm">
                        <div className="flex flex-col justify-between gap-1 border-b border-black/5 pb-2 sm:flex-row sm:items-center">
                          <span className="font-semibold text-neutral-500">Jurusan:</span>
                          <span className="font-medium text-neutral-900">{PENANGGUNG_JAWAB.jurusan}</span>
                        </div>
                        <div className="flex flex-col justify-between gap-1 border-b border-black/5 pb-2 sm:flex-row sm:items-center">
                          <span className="font-semibold text-neutral-500">Fakultas:</span>
                          <span className="font-medium text-neutral-900">{PENANGGUNG_JAWAB.fakultas}</span>
                        </div>
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                          <span className="font-semibold text-neutral-500">Universitas:</span>
                          <span className="font-medium text-marun">{PENANGGUNG_JAWAB.universitas}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pilar Hasil Program Grid */}
      <section className="container py-16 md:py-20">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow accent-underline accent-underline-center justify-center">
              Hasil Program
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
              Keunggulan Platform Direktori
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-sm text-neutral-500">
              Hasil karya digital yang dirancang untuk memberikan kemudahan akses bagi seluruh pemangku kepentingan.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILAR_PROGRAM.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={index} delay={index * 100}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-marun/10 text-marun">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold text-neutral-900">
                    {item.judul}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 text-justify">
                    {item.deskripsi}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
