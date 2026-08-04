"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
  ScaleControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { gmapsDirectionUrl } from "@/lib/format";
import { IconMapPin, IconDirections } from "@/components/Icons";

const { BaseLayer } = LayersControl;

// Titik tengah default: Nagari Pandai Sikek, Kec. X Koto.
const DEFAULT_CENTER = [-0.4712, 100.319];

// Marker kustom bertema (merah marun + emas) menggunakan divIcon,
// menghindari masalah path gambar marker default Leaflet pada bundler.
const markerIcon = L.divIcon({
  className: "umkm-marker",
  html: `
    <span class="umkm-pin">
      <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-5.5 8-12A8 8 0 1 0 4 10c0 6.5 8 12 8 12Z"
          fill="#8B1A1A" stroke="#C9A84C" stroke-width="1.5"/>
        <circle cx="12" cy="10" r="3.2" fill="#C9A84C"/>
      </svg>
    </span>`,
  iconSize: [36, 36],
  iconAnchor: [18, 34],
  popupAnchor: [0, -30],
});

// Sesuaikan tampilan agar semua marker terlihat (mode banyak titik).
function FitBounds({ points }) {
  const map = useMap();
  useMemo(() => {
    if (points.length > 1) {
      const bounds = L.latLngBounds(
        points.map((p) => [p.koordinat.lat, p.koordinat.lng])
      );
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [map, points]);
  return null;
}

export default function LeafletMap({ points = [], zoom = 14, height = "100%" }) {
  const center =
    points.length === 1
      ? [points[0].koordinat.lat, points[0].koordinat.lng]
      : DEFAULT_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{ height, width: "100%" }}
      className="h-full w-full"
    >
      {/* Kontrol lapisan ala Google Maps: Peta / Satelit */}
      <LayersControl position="topright">
        <BaseLayer checked name="Peta">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={20}
          />
        </BaseLayer>

        <BaseLayer name="Satelit">
          {/* Citra satelit Esri + label jalan/tempat di atasnya (mode hybrid) */}
          <LayerGroup>
            <TileLayer
              attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={20}
            />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={20}
            />
          </LayerGroup>
        </BaseLayer>
      </LayersControl>

      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" imperial={false} />

      {points.length > 1 && <FitBounds points={points} />}

      {points.map((p) => (
        <Marker
          key={p.id ?? p.slug}
          position={[p.koordinat.lat, p.koordinat.lng]}
          icon={markerIcon}
        >
          <Popup>
            <div className="flex flex-col overflow-hidden bg-gading text-neutral-800">
              {/* Header Image & Category Badge */}
              {p.foto_utama ? (
                <div className="relative h-28 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={p.foto_utama}
                    alt={p.nama}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {p.kategori && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-marun/90 border border-gold/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-[2px]">
                      {p.kategori}
                    </span>
                  )}
                </div>
              ) : (
                p.kategori && (
                  <div className="px-3.5 pt-3.5">
                    <span className="inline-block rounded-full bg-gold/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-dark">
                      {p.kategori}
                    </span>
                  </div>
                )
              )}

              {/* Content Details */}
              <div className="p-3.5 flex flex-col">
                <Link
                  href={`/umkm/${p.slug}`}
                  className="font-heading text-[15px] font-bold text-neutral-900 leading-snug hover:text-marun transition-colors"
                >
                  {p.nama}
                </Link>

                <div className="mt-2 flex items-start gap-1 text-[11px] text-neutral-600 leading-relaxed">
                  <IconMapPin className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                  <span>Jorong {p.jorong}, Nagari Pandai Sikek</span>
                </div>

                {/* Divider */}
                <div className="my-3 border-b border-black/5" />

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {p.slug && (
                    <Link
                      href={`/umkm/${p.slug}`}
                      className="flex-1 rounded-lg bg-marun py-2 text-center text-xs font-semibold text-white shadow-sm hover:bg-marun-dark hover:shadow transition"
                    >
                      Detail
                    </Link>
                  )}
                  <a
                    href={gmapsDirectionUrl(p.koordinat.lat, p.koordinat.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-marun/30 bg-white py-2 text-center text-xs font-semibold text-marun hover:bg-marun/5 transition"
                  >
                    <IconDirections className="h-3.5 w-3.5" />
                    <span>Rute</span>
                  </a>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
