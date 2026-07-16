/** Format angka menjadi Rupiah, mis. 1500000 -> "Rp1.500.000". */
export function formatRupiah(angka) {
  if (angka == null || Number.isNaN(Number(angka))) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(angka));
}

/** Tampilkan rentang harga, mis. "Rp650.000 – Rp1.400.000". */
export function formatRentangHarga(min, max) {
  if (min == null && max == null) return "Hubungi penjual";
  if (min != null && max != null && min !== max) {
    return `${formatRupiah(min)} – ${formatRupiah(max)}`;
  }
  return formatRupiah(min ?? max);
}

/** Buat tautan wa.me dengan pesan default (opsional). */
export function waLink(nomor, pesan) {
  const bersih = String(nomor || "").replace(/[^0-9]/g, "");
  const teks = pesan ? `?text=${encodeURIComponent(pesan)}` : "";
  return `https://wa.me/${bersih}${teks}`;
}

/** Tautan rute Google Maps (navigasi) menuju koordinat tujuan. */
export function gmapsDirectionUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** Tautan untuk melihat titik koordinat di Google Maps. */
export function gmapsViewUrl(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
