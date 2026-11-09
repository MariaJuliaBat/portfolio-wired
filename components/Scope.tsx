"use client";

import { useReducedMotion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { BOUNTIES } from "@/lib/data";

type Props = {
  onPick: (id: string) => void;
};

/**
 * Radar de varredura. Cada projeto é um blip: clicar abre o bounty.
 * É a navegação "não linear" da tela inicial.
 */
export function Scope({ onPick }: Props) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 200 200" className="size-full" role="img" aria-label="Radar com os projetos como pontos">
        <defs>
          <radialGradient id="scope-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--c-phosphor)", stopOpacity: 0.12 }} />
            <stop offset="100%" style={{ stopColor: "var(--c-phosphor)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#scope-fade)" className="stroke-phosphor-dim" strokeWidth="1" />
        <circle cx="100" cy="100" r="70" className="fill-none stroke-phosphor-dim" strokeWidth="0.7" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="44" className="fill-none stroke-phosphor-dim" strokeWidth="0.7" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="18" className="fill-none stroke-phosphor-dim" strokeWidth="0.7" />
        <path d="M100 4V196M4 100H196" className="stroke-phosphor-dim" strokeWidth="0.6" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const long = i % 9 === 0;
          const r1 = long ? 90 : 93;
          return (
            <line
              key={i}
              x1={100 + Math.sin(a) * r1}
              y1={100 - Math.cos(a) * r1}
              x2={100 + Math.sin(a) * 96}
              y2={100 - Math.cos(a) * 96}
              className="stroke-phosphor"
              strokeOpacity={long ? 0.9 : 0.4}
              strokeWidth="0.8"
            />
          );
        })}
        <g>
          {reduce ? null : (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
          <path d="M100 100 L100 6 A94 94 0 0 1 160 28 Z" className="fill-phosphor" fillOpacity="0.14" />
          <line x1="100" y1="100" x2="100" y2="6" className="stroke-phosphor" strokeWidth="1" strokeOpacity="0.9" />
        </g>
        <circle cx="100" cy="100" r="2.2" className="fill-amber" />
      </svg>

      {BOUNTIES.map((b) => (
        <button
          key={b.id}
          type="button"
          onClick={() => {
            sfx.play("select");
            onPick(b.id);
          }}
          onPointerEnter={() => sfx.play("ping")}
          aria-label={`Abrir bounty ${b.id}: ${b.codename}`}
          className="group absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center"
          style={{ left: `${b.blip.x}%`, top: `${b.blip.y}%` }}
        >
          <span className="blip-ping absolute size-2 rounded-full bg-amber" />
          <span className="relative size-2 rounded-full bg-amber group-hover:bg-paper group-focus-visible:bg-paper" />
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
              b.blip.x > 55 ? "right-full mr-1" : "left-full ml-1"
            } rounded-full bg-ink/90 px-2 font-crt text-base tracking-wider text-amber opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
          >
            #{b.id} {b.codename}
          </span>
        </button>
      ))}
    </div>
  );
}
