"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MENU = [
  { label: "Beranda", href: "/" },
  { label: "UMKM", href: "/umkm" },
  { label: "Galeri", href: "/galeri" },
  { label: "Peta", href: "/peta" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-black/5 bg-gading/95 backdrop-blur supports-[backdrop-filter]:bg-gading/80"
          : "border-transparent bg-gading"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="Logo UMKM Pandai Sikek"
            width={44}
            height={44}
            className="h-10 w-10 md:h-11 md:w-11"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-bold text-marun md:text-lg">
              UMKM Pandai Sikek
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-dark">
              Warisan Tenun Songket
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "text-marun"
                    : "text-neutral-600 hover:text-marun"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-marun to-gold" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-marun md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Panel menu mobile */}
      {open && (
        <div className="border-t border-black/5 bg-gading md:hidden">
          <ul className="container flex flex-col py-2">
            {MENU.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition ${
                    isActive(item.href)
                      ? "bg-marun/5 text-marun"
                      : "text-neutral-700 hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
