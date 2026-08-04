import PageHeader from "@/components/PageHeader";
import GaleriGrid from "@/components/GaleriGrid";
import Reveal from "@/components/Reveal";
import { getAllGaleri, getAllUmkm } from "@/lib/umkm";

export const metadata = {
  title: "Galeri Produk",
  description:
    "Galeri foto produk dan karya dari seluruh UMKM Nagari Pandai Sikek.",
};

export default function GaleriPage() {
  const items = getAllGaleri();
  const umkmList = getAllUmkm().map((u) => ({ slug: u.slug, nama: u.nama }));

  return (
    <>
      <Reveal>
        <PageHeader
          eyebrow="Galeri"
          title="Galeri Karya Pandai Sikek"
          description="Kumpulan foto produk dan karya dari berbagai pelaku UMKM Nagari Pandai Sikek. Saring berdasarkan UMKM di bawah ini."
        />
      </Reveal>
      <section className="container py-14 md:py-16">
        <Reveal delay={150}>
          <GaleriGrid items={items} umkmList={umkmList} />
        </Reveal>
      </section>
    </>
  );
}
