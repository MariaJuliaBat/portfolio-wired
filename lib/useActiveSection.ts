"use client";

import { useEffect, useState } from "react";
import { NAV } from "./data";

/** Devolve o id da seção que está cruzando o meio da tela. */
export function useActiveSection(): string {
  const [here, setHere] = useState<string>(NAV[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setHere(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return here;
}
