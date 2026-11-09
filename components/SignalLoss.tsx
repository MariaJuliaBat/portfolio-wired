"use client";

import { AnimatePresence, motion } from "framer-motion";

const SLICES = [
  { top: 4, h: 8, x: -60 },
  { top: 14, h: 5, x: 80 },
  { top: 24, h: 11, x: -30 },
  { top: 38, h: 6, x: 120 },
  { top: 47, h: 12, x: -90 },
  { top: 62, h: 5, x: 50 },
  { top: 71, h: 10, x: -110 },
  { top: 86, h: 7, x: 70 },
] as const;

const BARS = ["bg-paper", "bg-amber", "bg-signal", "bg-phosphor", "bg-rust", "bg-ink"] as const;

type Props = {
  active: boolean;
};

/**
 * Transição entre telas: o vídeo perde o sinal por meio segundo.
 * Fatias horizontais deslocadas, barras de teste, estática e um corte seco.
 */
export function SignalLoss({ active }: Props) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="signal-loss"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.08 } }}
        >
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.35, 1, 0.6, 0] }}
            transition={{ duration: 0.62, times: [0, 0.18, 0.3, 0.5, 0.78, 1], ease: "linear" }}
          />

          {SLICES.map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-x-0 bg-phosphor mix-blend-difference"
              style={{ top: `${s.top}%`, height: `${s.h}%` }}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 0.85, 0, 0.7, 0], x: [0, s.x, -s.x / 2, s.x / 3, 0] }}
              transition={{ duration: 0.5, delay: i * 0.022, ease: "linear" }}
            />
          ))}

          <motion.div
            className="absolute inset-x-0 top-[14%] flex h-[16%] flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 1, 0] }}
            transition={{ duration: 0.45, delay: 0.08, ease: "linear" }}
          >
            <div className="flex flex-1">
              {BARS.map((c) => (
                <div key={c} className={`flex-1 ${c}`} />
              ))}
            </div>
          </motion.div>

          <motion.p
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-crt text-3xl tracking-[0.4em] text-amber sm:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 1, 0] }}
            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
          >
            SIGNAL LOST
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
