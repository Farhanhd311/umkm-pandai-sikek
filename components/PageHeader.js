import SongketDivider from "@/components/SongketDivider";

// Header seragam untuk halaman interior.
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-marun text-gading">
      {/* Aksen motif tipis di latar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #C9A84C 0, #C9A84C 2px, transparent 2px, transparent 14px)",
        }}
      />
      <div className="container relative py-16 text-center md:py-20">
        {eyebrow && (
          <p className="eyebrow justify-center text-gold-light">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-heading text-3xl font-bold md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-gading/85 md:text-base">
            {description}
          </p>
        )}
        <SongketDivider className="mt-6" />
      </div>
    </section>
  );
}
