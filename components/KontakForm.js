"use client";

import { useState } from "react";
import { IconCheck, IconMail, IconWhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";
import { waLink } from "@/lib/format";

const KOSONG = { nama: "", email: "", subjek: "", pesan: "" };

export default function KontakForm() {
  const [form, setForm] = useState(KOSONG);
  const [terkirim, setTerkirim] = useState(false);

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // Tanpa backend: tampilkan konfirmasi. Nagari dapat menindaklanjuti
    // lewat email/WhatsApp menggunakan tombol di bawah.
    setTerkirim(true);
  };

  const teksWa =
    `Halo Nagari Pandai Sikek,\n\n` +
    `Nama: ${form.nama || "-"}\n` +
    `Email: ${form.email || "-"}\n` +
    `Subjek: ${form.subjek || "-"}\n\n` +
    `${form.pesan || ""}`;

  const mailto =
    `mailto:${site.kontak.email}` +
    `?subject=${encodeURIComponent(form.subjek || "Pesan dari website UMKM Pandai Sikek")}` +
    `&body=${encodeURIComponent(teksWa)}`;

  if (terkirim) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold text-neutral-900">
          Terima kasih, {form.nama || "Sahabat"}!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-600">
          Pesan Anda sudah kami siapkan. Untuk memastikan pesan terkirim,
          silakan lanjutkan melalui WhatsApp atau email di bawah ini.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waLink(site.kontak.whatsapp, teksWa)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa"
          >
            <IconWhatsApp className="h-5 w-5" />
            Kirim via WhatsApp
          </a>
          <a href={mailto} className="btn-outline">
            <IconMail className="h-5 w-5" />
            Kirim via Email
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(KOSONG);
            setTerkirim(false);
          }}
          className="mt-6 text-sm font-medium text-neutral-500 underline underline-offset-2 hover:text-marun"
        >
          Tulis pesan baru
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nama Lengkap" htmlFor="nama">
          <input
            id="nama"
            name="nama"
            required
            value={form.nama}
            onChange={ubah}
            placeholder="Nama Anda"
            className="inp"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={ubah}
            placeholder="email@contoh.com"
            className="inp"
          />
        </Field>
      </div>

      <Field label="Subjek" htmlFor="subjek" className="mt-5">
        <input
          id="subjek"
          name="subjek"
          required
          value={form.subjek}
          onChange={ubah}
          placeholder="Perihal pesan Anda"
          className="inp"
        />
      </Field>

      <Field label="Pesan" htmlFor="pesan" className="mt-5">
        <textarea
          id="pesan"
          name="pesan"
          required
          rows={5}
          value={form.pesan}
          onChange={ubah}
          placeholder="Tulis pesan Anda di sini…"
          className="inp resize-y"
        />
      </Field>

      <button type="submit" className="btn-primary mt-6 w-full">
        Kirim Pesan
      </button>

      <style jsx>{`
        :global(.inp) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #fff;
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.inp:focus) {
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.25);
        }
      `}</style>
    </form>
  );
}

function Field({ label, htmlFor, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      {children}
    </div>
  );
}
