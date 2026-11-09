/** Disquete de 3,5" em miniatura, usado como marcador de lista no ARCHIVE. */
export function Floppy({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="18" height="18" rx="1.5" className="fill-none stroke-current" strokeWidth="1.4" />
      <rect x="5" y="1" width="10" height="6" className="fill-current" opacity="0.85" />
      <rect x="11" y="2.4" width="2.4" height="3.2" className="fill-panel" />
      <rect x="4" y="11" width="12" height="7" className="fill-none stroke-current" strokeWidth="1" />
    </svg>
  );
}
