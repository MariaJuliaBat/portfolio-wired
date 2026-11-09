/**
 * Fios de poste lá no alto, balançando devagar: a imagem que abre Serial Experiments Lain.
 * É só decoração, bem apagada, atrás de todo o conteúdo.
 */
export function PowerLines() {
  const wire = "fill-none stroke-phosphor-dim";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 170"
      preserveAspectRatio="xMidYMin slice"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-36 w-full opacity-60"
    >
      {/* postes */}
      <g className="stroke-phosphor-dim" strokeWidth="5" strokeLinecap="round">
        <path d="M96 0V170" />
        <path d="M1104 0V170" />
      </g>
      <g className="stroke-phosphor-dim" strokeWidth="3" strokeLinecap="round">
        <path d="M60 22H132M72 50H120" />
        <path d="M1068 22H1140M1080 50H1128" />
      </g>

      {/* fios */}
      <g className="wire-sway" strokeWidth="1.4">
        <path className={wire} d="M-20 14Q40 40 84 22" />
        <path className={wire} d="M108 22Q600 118 1092 22" />
        <path className={wire} d="M108 30Q600 128 1092 30" />
        <path className={wire} d="M108 50Q600 140 1092 50" />
        <path className={wire} d="M84 50Q40 70 -20 54" />
        <path className={wire} d="M1116 22Q1160 40 1220 14" />
        <path className={wire} d="M1116 50Q1160 70 1220 54" />
      </g>
    </svg>
  );
}
