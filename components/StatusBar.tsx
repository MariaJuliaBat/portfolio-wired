"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

/** Barra de status do "sistema operacional": versão, sinal, relógio de Brasília, som e tema. */
export function StatusBar() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setClock(fmt.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-phosphor-dim/70 bg-panel/80 px-3 py-1 font-crt text-lg tracking-widest text-phosphor sm:px-5">
      <Logo className="size-7" />
      <span className="glow">WIRED/OS v0.9</span>
      <span className="hidden text-phosphor-dim md:inline">{"// MJB-01"}</span>

      <span className="ml-auto flex items-center gap-2">
        <SoundToggle />
        <ThemeToggle />
      </span>

      <span className="hidden items-center gap-2 text-amber lg:flex">
        <span aria-hidden="true" className="flex items-end gap-0.5">
          <i className="block h-1.5 w-1 bg-current" />
          <i className="block h-2.5 w-1 bg-current" />
          <i className="block h-3.5 w-1 bg-current" />
          <i className="block h-4.5 w-1 bg-current opacity-30" />
        </span>
        ENLACE ESTÁVEL
      </span>
      <span className="hidden tabular-nums text-paper sm:inline">BRT {clock}</span>
    </div>
  );
}
