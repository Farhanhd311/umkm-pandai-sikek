// Komponen embed YouTube yang URL-nya mudah diganti.
// Mendukung dua mode:
//   - "background": video menutupi kontainer (untuk hero), tanpa kontrol, autoplay + mute + loop.
//   - "responsive": pemutar 16:9 biasa dengan kontrol.

/** Ambil ID video dari berbagai format URL YouTube. */
export function getYouTubeId(url) {
  if (!url) return null;
  // Sudah berupa ID (11 karakter) langsung.
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function YouTubeEmbed({
  url,
  title = "Video",
  mode = "responsive",
}) {
  const id = getYouTubeId(url);
  if (!id) return null;

  if (mode === "background") {
    const src =
      `https://www.youtube-nocookie.com/embed/${id}` +
      `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0` +
      `&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1`;
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Skala iframe agar benar-benar menutupi area (cover), bukan letterbox. */}
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          frameBorder="0"
        />
        {/* Overlay transparan tambahan untuk menghentikan interaksi sentuhan */}
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    );
  }

  const src =
    `https://www.youtube-nocookie.com/embed/${id}` +
    `?rel=0&modestbranding=1&playsinline=1`;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
      />
    </div>
  );
}
