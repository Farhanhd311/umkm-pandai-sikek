import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import MapView from "@/components/MapView";
import Reveal from "@/components/Reveal";
import { IconMapPin, IconArrowRight, IconDirections } from "@/components/Icons";
import { getUmkmForPeta } from "@/lib/umkm";
import { gmapsDirectionUrl } from "@/lib/format";

export const metadata = {
  title: "Peta Lokasi UMKM",
  description:
    "Peta interaktif lokasi seluruh UMKM Nagari Pandai Sikek. Klik marker untuk melihat info singkat dan menuju halaman detail.",
};

export default function PetaPage() {
  const points = getUmkmForPeta();

  return (
    <>
      <Reveal>
        <PageHeader
          eyebrow="Peta"
          title="Peta Lokasi UMKM"
          description="Temukan lokasi para pengrajin di Nagari Pandai Sikek. Klik marker pada peta untuk melihat info singkat dan menuju halaman detail."
        />
      </Reveal>

      <section className="container py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Peta */}
          <div className="lg:col-span-2">
            <Reveal duration={700}>
              <MapView points={points} className="h-[420px] md:h-[560px]" />
              <p className="mt-3 text-xs text-neutral-400">
                Sumber peta: OpenStreetMap. Titik lokasi bersifat perkiraan.
              </p>
            </Reveal>
          </div>

          {/* Daftar lokasi */}
          <aside className="lg:col-span-1">
            <Reveal delay={100} duration={700}>
              <h2 className="font-heading text-xl font-bold text-neutral-900">
                Daftar Lokasi
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {points.length} UMKM di Nagari Pandai Sikek
              </p>
            </Reveal>
            <ul className="mt-5 space-y-3">
              {points.map((p, idx) => (
                <Reveal key={p.id} delay={150 + idx * 50} duration={600}>
                  <li
                    className="group flex items-center gap-2 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:border-gold hover:shadow-md"
                  >
                    <Link
                      href={`/umkm/${p.slug}`}
                      className="flex min-w-0 flex-1 items-start gap-3"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-marun/10 text-marun">
                        <IconMapPin className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading font-semibold text-neutral-900 group-hover:text-marun">
                          {p.nama}
                        </span>
                        <span className="block text-xs text-neutral-500">
                          {p.kategori} · Jorong {p.jorong}
                        </span>
                      </span>
                      <IconArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300 transition group-hover:text-marun" />
                    </Link>
                    <a
                      href={gmapsDirectionUrl(p.koordinat.lat, p.koordinat.lng)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Rute ke ${p.nama}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gading text-marun transition hover:bg-marun hover:text-white"
                    >
                      <IconDirections className="h-4 w-4" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
