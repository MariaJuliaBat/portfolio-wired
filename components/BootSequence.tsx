"use client";

import { useEffect, useRef, useState } from "react";
import { disableSound, enableSound, sfx } from "@/lib/audio";
import { Logo } from "./Logo";

type Line = { label: string; status?: string };

const LINES: Line[] = [
  { label: "WIRED/OS bios 0.9 · terminal MJB-01" },
  { label: "memória: 640K ok" },
  { label: "montando /dev/maju", status: "OK" },
  { label: "carregando node.js", status: "OK" },
  { label: "carregando express", status: "OK" },
  { label: "conectando postgresql", status: "OK" },
  { label: "carregando python 3", status: "OK" },
  { label: "sincronizando github.com/MariaJuliaBat", status: "OK" },
  { label: "contatando satélite SAT-004", status: "OK" },
  { label: "calibrando tubo de raios catódicos", status: "OK" },
  { label: "atualizando para o protocolo 7", status: "OK" },
  { label: "3 · 2 · 1 · let's jam. entrando na Wired" },
];

type Props = {
  onDone: () => void;
};

/**
 * 1) Tela desligada: a pessoa escolhe ligar com ou sem som (o navegador só
 *    libera áudio depois de um gesto, então a escolha vale como esse gesto).
 * 2) Boot digitado. Qualquer tecla ou toque pula.
 */
export function BootSequence({ onDone }: Props) {
  const [phase, setPhase] = useState<"off" | "boot">("off");
  const [done, setDone] = useState<Line[]>([]);
  const [current, setCurrent] = useState("");
  const finished = useRef(false);
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === "off") firstBtn.current?.focus();
  }, [phase]);

  const power = async (withSound: boolean) => {
    if (withSound) {
      const ok = await enableSound();
      if (ok) sfx.play("boot");
    } else {
      disableSound();
    }
    setPhase("boot");
  };

  useEffect(() => {
    if (phase !== "boot") return;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      sfx.play("chime");
      onDone();
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const charDelay = reduce ? 0 : 13;
    const lineDelay = reduce ? 0 : 95;
    const timers: number[] = [];
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;

    const step = () => {
      if (cancelled) return;
      if (lineIdx >= LINES.length) {
        timers.push(window.setTimeout(finish, reduce ? 200 : 650));
        return;
      }
      const line = LINES[lineIdx];
      if (charIdx <= line.label.length) {
        setCurrent(line.label.slice(0, charIdx));
        if (charIdx > 0) sfx.play("key");
        charIdx += 1;
        timers.push(window.setTimeout(step, charDelay));
      } else {
        setDone((d) => [...d, line]);
        if (line.status) sfx.play("tick");
        setCurrent("");
        lineIdx += 1;
        charIdx = 0;
        timers.push(window.setTimeout(step, lineDelay));
      }
    };

    timers.push(window.setTimeout(step, 300));

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [phase, onDone]);

  if (phase === "off") {
    return (
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-8 p-6 text-center">
        <Logo className="size-24 drop-shadow-[0_0_14px_color-mix(in_srgb,var(--c-amber)_45%,transparent)]" />
        <div className="flex items-center gap-3 font-crt text-xl tracking-[0.3em] text-phosphor-dim">
          <i aria-hidden="true" className="led-blink block size-2.5 rounded-full bg-amber" />
          WIRED/OS · TERMINAL MJB-01 DESLIGADO
        </div>
        <div className="flex flex-col gap-3 font-crt text-2xl tracking-widest sm:flex-row">
          <button
            ref={firstBtn}
            type="button"
            onClick={() => power(true)}
            className="rounded-full border border-amber bg-amber px-7 py-2 text-ink hover:bg-transparent hover:text-amber"
          >
            [ LIGAR COM SOM ]
          </button>
          <button
            type="button"
            onClick={() => power(false)}
            className="rounded-full border border-phosphor-dim px-7 py-2 text-phosphor hover:border-phosphor hover:bg-phosphor/10"
          >
            [ LIGAR SEM SOM ]
          </button>
        </div>
        <p className="max-w-md font-crt text-lg tracking-wide text-phosphor-dim">
          o som é todo sintetizado na hora: teclado, bipes de BIOS e chiado de tubo. fones de ouvido ajudam.
        </p>
      </div>
    );
  }

  const pct = Math.round((done.length / LINES.length) * 100);
  const filled = Math.round(pct / 5);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);

  return (
    <div className="relative z-10 flex min-h-dvh flex-col justify-end p-5 sm:p-10">
      <div className="mx-auto w-full max-w-3xl font-crt text-xl leading-snug sm:text-2xl">
        <ul>
          {done.map((l, i) => (
            <li key={`${l.label}-${i}`} className="flex gap-3">
              <span className="text-phosphor-dim">&gt;</span>
              <span className="glow">{l.label}</span>
              {l.status ? (
                <>
                  <span aria-hidden="true" className="flex-1 overflow-hidden whitespace-nowrap text-phosphor-dim">
                    {"· ".repeat(60)}
                  </span>
                  <span className="text-amber">[ {l.status} ]</span>
                </>
              ) : null}
            </li>
          ))}
          {done.length < LINES.length ? (
            <li className="flex gap-3">
              <span className="text-phosphor-dim">&gt;</span>
              <span className="glow cursor">{current}</span>
            </li>
          ) : null}
        </ul>
        <p className="mt-6 text-lg text-phosphor-dim sm:text-xl">
          [{bar}] {pct}% · qualquer tecla pula
        </p>
      </div>
    </div>
  );
}
