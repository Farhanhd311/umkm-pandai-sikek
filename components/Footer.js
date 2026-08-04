import Link from "next/link";
import Image from "next/image";

const MENU = [
  { label: "Beranda", href: "/" },
  { label: "Direktori UMKM", href: "/umkm" },
  { label: "Galeri", href: "/galeri" },
  { label: "Peta Lokasi", href: "/peta" },
  { label: "Tentang", href: "/tentang" },
];

export default function Footer() {
  const tahun = 2026;
  return (
    <footer className="mt-20 bg-marun-dark text-gading">
      <div className="songket-divider opacity-70" />
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Logo UMKM Pandai Sikek"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white/5 p-1"
            />
            <div>
              <p className="font-heading text-lg font-bold">UMKM Nagari Pandai Sikek</p>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-light">
                Warisan &amp; UMKM Nagari Minangkabau
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gading/80">
            Direktori digital UMKM Nagari Pandai Sikek, Kecamatan X Koto,
            Kabupaten Tanah Datar, Sumatera Barat. Mendukung pelaku UMKM
            dan produk khas Minangkabau agar lebih dikenal luas.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-heading text-base font-semibold text-gold-light">
            Navigasi
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {MENU.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gading/80 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Credit */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-gading/70 md:flex-row md:text-left">
          <p>
            © {tahun} UMKM Nagari Pandai Sikek. Seluruh hak cipta dilindungi.
          </p>
          <p>
            Dikembangkan oleh{" "}
            <span className="font-semibold text-gold-light">
              Tim KKN Nagari Pandai Sikek Periode II 2026
            </span>{" "}
            · Universitas Andalas
          </p>
        </div>
      </div>
    </footer>
  );
}
