type Props = {
  className?: string;
};

/**
 * Logo do WIRED/OS: uma telinha de cantos redondos, um "M" de Maju/MJB-01 que
 * também parece uma onda de sinal, e um satélite no anel de órbita.
 * Segue as cores do tema. O favicon (app/icon.svg) usa a mesma forma.
 */
export function Logo({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo WIRED/OS">
      <rect x="4" y="4" width="56" height="56" rx="17" className="fill-panel stroke-amber" strokeWidth="3" />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="9"
        transform="rotate(-25 32 32)"
        className="fill-none stroke-phosphor-dim"
        strokeWidth="1.6"
        strokeDasharray="3 3"
      />
      <path d="M17 45 V21 L32 36 L47 21 V45" className="fill-none stroke-phosphor" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="53.5" cy="20.5" r="4.2" className="fill-rust stroke-panel" strokeWidth="1.4" />
    </svg>
  );
}
