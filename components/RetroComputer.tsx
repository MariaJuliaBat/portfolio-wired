"use client";

import { sfx } from "@/lib/audio";

type Props = {
  email: string;
};

const BEIGE = "#f3e2ea";
const BEIGE_DARK = "#d9bdd0";
const BEIGE_LINE = "#8d6f93";

/**
 * Micro dos anos 80: monitor de tubo bege, disquete, teclado e LED.
 * É um link: clicar abre um e-mail para ela.
 */
export function RetroComputer({ email }: Props) {
  return (
    <a
      href={`mailto:${email}`}
      aria-label={`Escrever para ${email}`}
      onPointerEnter={() => sfx.play("blip")}
      onClick={() => sfx.play("chime")}
      className="group block w-full max-w-[290px] transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 220 214" className="w-full drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]" role="img" aria-hidden="true">
        {/* gabinete do monitor */}
        <rect x="20" y="6" width="180" height="136" rx="12" fill={BEIGE} stroke={BEIGE_LINE} strokeWidth="2" />
        <rect x="26" y="12" width="168" height="8" rx="4" fill="#ece5cd" opacity="0.7" />
        {/* tela */}
        <rect x="34" y="22" width="152" height="92" rx="10" fill="#04100a" stroke={BEIGE_LINE} strokeWidth="3" />
        <path d="M44 30 Q60 26 90 28" stroke="#86e3a4" strokeOpacity="0.18" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g style={{ fontFamily: "var(--font-vt323), ui-monospace, monospace" }} fontSize="14" fill="#86e3a4">
          <text x="46" y="46">A:\&gt; mail maju</text>
          <text x="46" y="63" fill="#ffb43a">para: juliabatista.tec</text>
          <text x="46" y="78" fill="#ffb43a">@gmail.com</text>
          <text x="46" y="98">assunto: </text>
          <rect x="96" y="88" width="7" height="11" className="blink" />
        </g>
        {/* faixa inferior: logo, LED e fenda do disquete */}
        <rect x="34" y="118" width="152" height="18" rx="3" fill={BEIGE_DARK} opacity="0.55" />
        <text
          x="40"
          y="131"
          fontSize="11"
          fill="#4d4631"
          style={{ fontFamily: "var(--font-vt323), ui-monospace, monospace", letterSpacing: "1.5px" }}
        >
          MJB-01
        </text>
        <rect x="106" y="124" width="52" height="5" rx="1.5" fill="#2a261a" />
        <circle cx="172" cy="127" r="3.4" fill="#ffb43a" className="led-blink" />
        {/* pescoço e base */}
        <rect x="76" y="142" width="68" height="12" fill={BEIGE_DARK} stroke={BEIGE_LINE} strokeWidth="1.5" />
        <rect x="48" y="152" width="124" height="9" rx="4" fill={BEIGE} stroke={BEIGE_LINE} strokeWidth="1.5" />
        {/* teclado */}
        <path d="M18 196 L34 166 H186 L202 196 Z" fill={BEIGE} stroke={BEIGE_LINE} strokeWidth="2" strokeLinejoin="round" />
        {Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 11 }, (_, col) => (
            <rect
              key={`${row}-${col}`}
              x={46 + col * 12.6 - row * 3.5}
              y={171 + row * 8}
              width="9.6"
              height="5.2"
              rx="1"
              fill="#fff6fa"
              stroke={BEIGE_LINE}
              strokeWidth="0.7"
            />
          )),
        )}
        <rect x="70" y="194" width="80" height="5" rx="1.5" fill="#fff6fa" stroke={BEIGE_LINE} strokeWidth="0.7" transform="translate(0 -3)" />
        {/* disquete ao lado */}
        <g transform="translate(168 176) rotate(-8)">
          <rect width="34" height="34" rx="2" fill="#6b57b8" stroke="#3f2f7a" strokeWidth="1.2" />
          <rect x="7" y="0" width="20" height="11" fill="#c6b8f2" />
          <rect x="18" y="2" width="5" height="7" fill="#6b57b8" />
          <rect x="5" y="17" width="24" height="15" fill="#fff6fa" />
          <path d="M8 22 h18 M8 26 h12" stroke="#7f7659" strokeWidth="1" />
        </g>
      </svg>
      <p className="mt-2 text-center font-crt text-lg tracking-widest text-phosphor-dim group-hover:text-amber">
        clique no micro para escrever
      </p>
    </a>
  );
}
