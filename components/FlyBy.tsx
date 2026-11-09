"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { Spaceship } from "./Spaceship";

type Flight = { id: number; top: number; dir: 1 | -1; dur: number; width: number };

type Props = {
  active: boolean;
};

/**
 * De vez em quando a MJB-01 atravessa a tela devagar, balançando em 3D:
 * ela inclina, gira de leve e chega mais perto ou mais longe, com um rastro suave.
 * Primeira passagem uns 7 s depois do boot; as seguintes a cada 22–40 s.
 */
export function FlyBy({ active }: Props) {
  const reduce = useReducedMotion();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    const wait = round === 0 ? 7000 : 22000 + Math.random() * 18000;
    const timer = window.setTimeout(() => {
      setFlight({
        id: round,
        top: 14 + Math.random() * 58,
        dir: Math.random() < 0.5 ? 1 : -1,
        dur: 11 + Math.random() * 4,
        width: 120 + Math.random() * 70,
      });
      sfx.play("whoosh");
    }, wait);
    return () => window.clearTimeout(timer);
  }, [active, reduce, round]);

  if (!flight) return null;
  const { dir } = flight;

  return (
    <motion.div
      key={flight.id}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 z-[55]"
      style={{ top: `${flight.top}%`, width: flight.width, perspective: 700 }}
      initial={{ x: dir === 1 ? "-25vw" : "112vw", y: 0 }}
      animate={{ x: dir === 1 ? "112vw" : "-25vw", y: [0, -22, 8, -14, 0] }}
      transition={{
        x: { duration: flight.dur, ease: "linear" },
        y: { duration: flight.dur, ease: "easeInOut" },
      }}
      onAnimationComplete={() => {
        setFlight(null);
        setRound((r) => r + 1);
      }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateY: [-30, 12, -16, 18, -10],
          rotateX: [8, -5, 7, -3, 5],
          rotateZ: [-2, 1.5, -1.5, 2, -2],
          scale: [0.8, 1.08, 0.92, 1.1, 0.86],
        }}
        transition={{ duration: flight.dur, ease: "easeInOut" }}
      >
        <div className="relative" style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}>
          <div className="absolute right-[92%] top-[48%] h-px w-[140%] bg-gradient-to-l from-paper/70 via-signal/30 to-transparent" />
          <Spaceship className="relative w-full drop-shadow-[0_12px_14px_rgba(10,6,30,0.4)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
