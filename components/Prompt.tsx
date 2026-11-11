"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";

/** Navegação escondida: um prompt no canto que só abre quando você chega perto (ou aperta "/"). */
export function Prompt() {
  const [open, setOpen] = useState(false);
  const [here, setHere] = useState<string>("sinal");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setHere(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Navegação"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-1 bg-void/70 py-2 pr-4 font-mono text-xs backdrop-blur-sm sm:bottom-10 sm:left-12"
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="flex items-center text-mint"
        aria-label="Abrir navegação"
      >
        &gt;
        {!open && <span className="caret pl-2 text-dim">{here}</span>}
      </button>

      {open && (
        <ul className="flex gap-5 pl-2">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`transition-colors hover:text-bone ${here === n.id ? "text-bone" : "text-dim"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
