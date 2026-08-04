import PageHeader from "@/components/PageHeader";
import UmkmDirectory from "@/components/UmkmDirectory";
import Reveal from "@/components/Reveal";
import { getAllUmkm, getKategori } from "@/lib/umkm";

export const metadata = {
  title: "Direktori UMKM",
  description:
    "Jelajahi seluruh UMKM Nagari Pandai Sikek. Cari berdasarkan nama usaha atau produk, dan saring menurut kategori.",
};

export default function UmkmPage() {
  const umkm = getAllUmkm();
  const kategori = getKategori();

  return (
    <>
      <Reveal>
        <PageHeader
          eyebrow="Direktori"
          title="UMKM Nagari Pandai Sikek"
          description="Temukan berbagai UMKM dan produk khas Nagari Pandai Sikek. Gunakan pencarian dan filter untuk menemukan yang Anda cari."
        />
      </Reveal>
      <section className="container py-14 md:py-16">
        <Reveal delay={150}>
          <UmkmDirectory umkm={umkm} kategori={kategori} />
        </Reveal>
      </section>
    </>
  );
}

