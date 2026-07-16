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

    // Set initial invisible state
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
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
      { threshold: 0.12 }
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
