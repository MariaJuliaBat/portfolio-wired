type Props = {
  className?: string;
};

/**
 * MJB-01: uma nave esguia, de linhas longas e asa em delta, em casco champanhe
 * e ouro rosé com sombras de ameixa e um vidro escuro. Sem enfeites: o volume vem
 * dos gradientes (casco com reflexo no topo, asa da frente mais clara que a de trás).
 * Aponta para a direita; o motor solta um traço fino de luz violeta.
 * Cores fixas: ela fica igual nos dois temas.
 */
export function Spaceship({ className = "" }: Props) {
  return (
    <svg viewBox="-40 0 262 96" className={className} role="img" aria-label="Nave espacial MJB-01">
      <defs>
        <linearGradient id="ship-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8f2" />
          <stop offset="0.32" stopColor="#f3d6c6" />
          <stop offset="0.7" stopColor="#c9917f" />
          <stop offset="1" stopColor="#5a3a6e" />
        </linearGradient>
        <linearGradient id="ship-wing-near" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1cdbd" />
          <stop offset="0.55" stopColor="#b98378" />
          <stop offset="1" stopColor="#4c3060" />
        </linearGradient>
        <linearGradient id="ship-wing-far" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3b2750" />
          <stop offset="1" stopColor="#8d7399" />
        </linearGradient>
        <linearGradient id="ship-fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8bfae" />
          <stop offset="1" stopColor="#6a4580" />
        </linearGradient>
        <linearGradient id="ship-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c1234" />
          <stop offset="0.7" stopColor="#5b3f8c" />
          <stop offset="1" stopColor="#a78bd6" />
        </linearGradient>
        <linearGradient id="ship-trail" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#d9c2ff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#a78bd6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* traço de luz do motor */}
      <g className="flame">
        <path d="M18 43 Q-14 41.5 -38 44 Q-14 46.5 18 47Z" fill="url(#ship-trail)" />
        <path d="M18 49 Q-8 47.5 -28 50 Q-8 52.5 18 53Z" fill="url(#ship-trail)" opacity="0.7" />
      </g>

      {/* asa de trás */}
      <path d="M92 44 L140 8 L154 9 L128 46Z" fill="url(#ship-wing-far)" stroke="#3d2a52" strokeWidth="0.7" strokeOpacity="0.6" strokeLinejoin="round" />

      {/* deriva */}
      <path d="M34 42 L24 14 L36 13 L66 41Z" fill="url(#ship-fin)" stroke="#3d2a52" strokeWidth="0.7" strokeOpacity="0.6" strokeLinejoin="round" />

      {/* casco longo e fino */}
      <path
        d="M10 46C32 39 84 37 142 39C178 40 204 44 220 49C204 54 178 57 142 58C84 60 32 58 10 52Z"
        fill="url(#ship-hull)"
        stroke="#3d2a52"
        strokeWidth="0.8"
        strokeOpacity="0.6"
        strokeLinejoin="round"
      />
      {/* reflexo e linhas de painel */}
      <path d="M26 43.5C62 40.5 120 40 176 43" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M40 52.5C84 54.4 140 54 190 51.6" fill="none" stroke="#2f1d44" strokeWidth="1" opacity="0.35" />
      <path d="M70 41V57M118 40.5V58M156 41V57" fill="none" stroke="#2f1d44" strokeWidth="0.6" opacity="0.28" />
      <path d="M44 48.4C86 47 142 47 198 49.6" fill="none" stroke="#7b3f63" strokeWidth="1.1" opacity="0.8" />

      {/* vidro escuro da cabine */}
      <path d="M160 42.2C176 40.6 196 43.4 210 47.6C194 46.4 176 45.6 160 46.2Z" fill="url(#ship-glass)" stroke="#2b1a46" strokeWidth="0.6" />
      <path d="M170 42.6C180 42 192 43.2 200 45" fill="none" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />

      {/* asa da frente */}
      <path d="M80 54 L126 90 L144 90 L118 55Z" fill="url(#ship-wing-near)" stroke="#3d2a52" strokeWidth="0.7" strokeOpacity="0.6" strokeLinejoin="round" />
      <path d="M92 60 L126 87" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M100 56 L132 82" fill="none" stroke="#2f1d44" strokeWidth="0.6" opacity="0.4" />

      {/* bocais */}
      <ellipse cx="14" cy="44.5" rx="3.4" ry="4.4" fill="#4c3060" stroke="#2b1a46" strokeWidth="0.6" />
      <ellipse cx="14" cy="51" rx="3.4" ry="4.4" fill="#4c3060" stroke="#2b1a46" strokeWidth="0.6" />
    </svg>
  );
}
