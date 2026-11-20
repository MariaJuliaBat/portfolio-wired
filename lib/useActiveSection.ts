"use client";

import { useEffect, useState } from "react";
import { NAV } from "./data";

/** Devolve o id da seção visível: a última cujo topo já passou de ~35% da altura da tela. */
export function useActiveSection(): string {
  const [here, setHere] = useState<string>(NAV[0].id);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: string = NAV[0].id;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }
      // no fim da página, a última seção fica ativa mesmo se for curta
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = NAV[NAV.length - 1].id;
      // no topo, sempre a primeira
      if (window.scrollY < 8) current = NAV[0].id;
      setHere(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return here;
}
