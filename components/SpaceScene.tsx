"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { Spaceship } from "./Spaceship";

const STARS: [number, number, number][] = [
  [18, 22, 1.2], [52, 70, 1], [84, 14, 1.4], [120, 40, 1], [176, 10, 1.2], [230, 28, 1],
  [268, 8, 1.4], [318, 36, 1], [356, 18, 1.2], [384, 66, 1], [30, 150, 1], [12, 196, 1.2],
  [64, 214, 1], [330, 120, 1], [372, 158, 1.2], [300, 200, 1], [210, 214, 1], [98, 96, 1],
];

type Props = {
  onOpenSatellite: () => void;
};

/** Rotação SVG nativa em torno de um ponto: não depende de transform-origin, então não "descola" da órbita. */
function Spin({ cx, cy, dur, children }: { cx: number; cy: number; dur: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <g>
      {reduce ? null : (
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
      )}
      {children}
    </g>
  );
}

/**
 * Cena de órbita: um planeta com anel, uma lua, o picossatélite do projeto
 * Ideia Space dando voltas e a MJB-01 flutuando no canto.
 */
export function SpaceScene({ onOpenSatellite }: Props) {
  const reduce = useReducedMotion();

  return (
    <div>
      <div className="relative">
        <svg viewBox="0 0 400 230" className="w-full" role="img" aria-label="Planeta com satélite em órbita e a nave MJB-01">
          <defs>
            <radialGradient id="planet-fill" cx="0.35" cy="0.3" r="0.85">
              <stop offset="0" style={{ stopColor: "var(--c-rust)", stopOpacity: 0.4 }} />
              <stop offset="1" style={{ stopColor: "var(--c-panel)", stopOpacity: 1 }} />
            </radialGradient>
            <clipPath id="planet-clip">
              <circle cx="150" cy="130" r="58" />
            </clipPath>
          </defs>

          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r * 0.9} className="fill-paper" opacity="0.7" />
          ))}

          {/* órbita do satélite */}
          <circle cx="150" cy="130" r="104" className="fill-none stroke-phosphor-dim" strokeWidth="0.8" strokeDasharray="2 4" />

          {/* anel (parte de trás) */}
          <ellipse
            cx="150"
            cy="130"
            rx="96"
            ry="19"
            transform="rotate(-18 150 130)"
            className="fill-none stroke-amber"
            strokeWidth="1.2"
            opacity="0.55"
          />

          {/* planeta */}
          <circle cx="150" cy="130" r="58" fill="url(#planet-fill)" className="stroke-phosphor" strokeWidth="1.4" />
          <g clipPath="url(#planet-clip)" className="stroke-phosphor-dim" fill="none" strokeWidth="1.1" opacity="0.8">
            <path d="M85 108 Q150 96 215 108" />
            <path d="M82 128 Q150 118 218 128" />
            <path d="M84 148 Q150 160 216 148" />
            <path d="M92 166 Q150 180 208 166" />
          </g>

          {/* anel (parte da frente, por cima do planeta) */}
          <path
            d="M54 130 A96 19 0 0 0 246 130"
            transform="rotate(-18 150 130)"
            className="fill-none stroke-amber"
            strokeWidth="1.6"
          />

          {/* lua */}
          <Spin cx={150} cy={130} dur={16}>
            <circle cx="150" cy="58" r="6" className="fill-panel stroke-paper" strokeWidth="1.2" />
            <circle cx="148" cy="56" r="1.4" className="fill-phosphor-dim" />
          </Spin>

          {/* picossatélite */}
          <Spin cx={150} cy={130} dur={30}>
            <g transform="translate(150 26)">
              <rect x="-4" y="-4" width="8" height="8" rx="1.5" className="fill-amber stroke-ink" strokeWidth="0.8" />
              <rect x="-17" y="-2.5" width="11" height="5" rx="1" className="fill-signal stroke-phosphor" strokeWidth="0.7" />
              <rect x="6" y="-2.5" width="11" height="5" rx="1" className="fill-signal stroke-phosphor" strokeWidth="0.7" />
              <path d="M0 -4 V-10" className="stroke-paper" strokeWidth="1" />
              <circle cx="0" cy="-11" r="1.3" className="fill-rust" />
            </g>
          </Spin>
        </svg>

        <motion.div
          className="pointer-events-none absolute bottom-1 right-0 w-[36%]"
          animate={reduce ? undefined : { y: [0, -7, 0, 5, 0], rotate: [-3, -1, -3, -5, -3] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        >
          <Spaceship className="w-full drop-shadow-[0_8px_10px_rgba(10,6,30,0.3)]" />
        </motion.div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-crt text-lg tracking-widest">
        <span className="text-phosphor-dim">ÓRBITA BAIXA · BRASÍLIA</span>
        <button
          type="button"
          onClick={() => {
            sfx.play("select");
            onOpenSatellite();
          }}
          onPointerEnter={() => sfx.play("blip")}
          className="rounded-full border border-amber/70 px-3 text-amber hover:bg-amber hover:text-ink"
        >
          SAT-004 · IDEIA SPACE →
        </button>
      </div>
    </div>
  );
}
