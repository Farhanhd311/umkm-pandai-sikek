import PageHeader from "@/components/PageHeader";
import KontakForm from "@/components/KontakForm";
import Reveal from "@/components/Reveal";
import { IconMapPin, IconPhone, IconMail, IconWhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";
import { waLink } from "@/lib/format";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi pemerintah Nagari Pandai Sikek atau tim KKN. Kirim pesan, pertanyaan, atau ajukan pendaftaran UMKM.",
};

export default function KontakPage() {
  const infoList = [
    {
      icon: <IconMapPin className="h-5 w-5" />,
      judul: "Alamat",
      isi: site.kontak.alamat,
    },
    {
      icon: <IconPhone className="h-5 w-5" />,
      judul: "Telepon",
      isi: site.kontak.telepon,
      href: `tel:${site.kontak.telepon.replace(/[^0-9+]/g, "")}`,
    },
    {
      icon: <IconMail className="h-5 w-5" />,
      judul: "Email",
      isi: site.kontak.email,
      href: `mailto:${site.kontak.email}`,
    },
    {
      icon: <IconWhatsApp className="h-5 w-5" />,
      judul: "WhatsApp",
      isi: "Chat langsung dengan pemerintah nagari",
      href: waLink(site.kontak.whatsapp, "Halo Nagari Pandai Sikek,"),
    },
  ];

  return (
    <>
      <Reveal>
        <PageHeader
          eyebrow="Kontak"
          title="Hubungi Kami"
          description="Ada pertanyaan, masukan, atau ingin mendaftarkan UMKM Anda? Kirim pesan melalui formulir di bawah ini atau hubungi kami langsung."
        />
      </Reveal>

      <section className="container py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info kontak */}
          <div className="lg:col-span-2">
            <Reveal duration={700}>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Pemerintah Nagari Pandai Sikek
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Kami siap membantu masyarakat dan pelaku UMKM Nagari Pandai Sikek.
                Silakan hubungi kami melalui salah satu kanal berikut.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {infoList.map((it, idx) => {
                const Konten = (
                  <div className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:border-gold">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marun/10 text-marun">
                      {it.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-neutral-900">
                        {it.judul}
                      </p>
                      <p className="mt-0.5 break-words text-sm text-neutral-600">
                        {it.isi}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={it.judul} delay={idx * 100} duration={600}>
                    <li>
                      {it.href ? (
                        <a
                          href={it.href}
                          target={it.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {Konten}
                        </a>
                      ) : (
                        Konten
                      )}
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal delay={150} duration={700}>
              <h2 className="font-heading text-2xl font-bold text-neutral-900">
                Kirim Pesan
              </h2>
              <p className="mt-3 text-sm text-neutral-600">
                Isi formulir di bawah ini. Pesan akan diteruskan ke pemerintah
                nagari melalui WhatsApp or email.
              </p>
              <div className="mt-6">
                <KontakForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
