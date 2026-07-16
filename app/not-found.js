import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-7xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-neutral-900 md:text-3xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-600">
        Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
        Silakan kembali ke beranda atau jelajahi direktori UMKM.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
        <Link href="/umkm" className="btn-outline">
          Lihat UMKM
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
