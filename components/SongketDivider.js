// Divider tipis bermotif songket (aksen, bukan dominan).
export default function SongketDivider({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="songket-divider !w-24" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}
