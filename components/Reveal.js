"use client";

import { useEffect, useRef } from "react";

/**
 * Komponen pembungkus yang menambahkan animasi muncul halus
 * (fade-in + slide-up) saat elemen masuk ke viewport saat di-scroll.
 * Menggunakan IntersectionObserver – tidak perlu library tambahan.
 *
 * Props:
 *   - as       : tag HTML yang dirender (default: "div")
 *   - delay    : delay animasi dalam ms (default: 0)
 *   - duration : durasi animasi dalam ms (default: 600)
 *   - className: class Tailwind / CSS tambahan
 *   - children : konten di dalamnya
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  duration = 600,
  className = "",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Cek apakah elemen sudah terlihat di viewport saat pertama kali mount
    // Jika ya, langsung tampilkan tanpa animasi agar tidak "hilang" di awal
    const rect = el.getBoundingClientRect();
    const isAlreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyVisible) {
      // Elemen sudah ada di viewport → langsung visible, tanpa delay
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }

    // Set initial invisible state hanya untuk elemen di luar viewport
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      // threshold 0 → langsung trigger begitu 1px elemen masuk viewport
      { threshold: 0, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
