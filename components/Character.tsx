"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { PixelMaju } from "./PixelMaju";

const LINES = [
  "oi! sou a Maju, versão Wired.",
  "a Wired é a rede. a última faixa explica tudo.",
  "o satélite lá embaixo é meu. clica nele.",
  "psiu: aperta / e digita help.",
  "tem comandos escondidos no terminal. tenta ein.",
  "cada ponto do radar é um projeto de verdade.",
];

/**
 * Maju em pixel art. Pisca, flutua em degraus (como um sprite antigo) e, ao clique, fala.
 */
export function Character() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState<number | null>(null);
  const timer = useRef(0);
  const next = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const say = () => {
    sfx.play("blip");
    setLine(next.current % LINES.length);
    next.current += 1;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLine(null), 5200);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={say}
        aria-label="Falar com a Maju da Wired"
        className="group block w-full cursor-pointer rounded-xl"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 1.6, ease: "linear", times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.6 }}
        >
          <PixelMaju className="w-full drop-shadow-[0_8px_0_color-mix(in_srgb,var(--c-phosphor-dim)_35%,transparent)]" />
        </motion.div>
      </button>

      {line !== null ? (
        <p
          role="status"
          className="absolute -bottom-1 right-0 z-20 w-[15rem] max-w-[80vw] translate-y-full rounded-2xl border border-amber bg-panel px-3 py-2 font-crt text-xl leading-tight text-paper"
        >
          <span className="text-amber">maju&gt; </span>
          {LINES[line]}
        </p>
      ) : null}

      <p className="mt-1 hidden text-center font-crt text-lg tracking-[0.25em] text-phosphor-dim sm:block">MAJU // NAVEGADORA</p>
    </div>
  );
}
