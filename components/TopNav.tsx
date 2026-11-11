"use client";

import { NAV } from "@/lib/data";
import { useActiveSection } from "@/lib/useActiveSection";

/** Barra fixa no topo: monograma, atalhos para cada seção (a atual fica acesa) e o "present day · present time". */
export function TopNav() {
  const here = useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5 sm:px-12">
        <a href="#sinal" aria-label="Maria Júlia Batista, início" className="shrink-0 font-serif text-2xl leading-none italic">
          MJ<span className="text-bronze not-italic">_</span>
        </a>

        <nav aria-label="Seções" className="-mr-2 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-1 font-mono text-[11px] tracking-[0.14em] whitespace-nowrap uppercase sm:gap-2 sm:text-xs">
            {NAV.map((n) => {
              const active = here === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`relative block px-2.5 py-2 transition-colors hover:text-bone ${active ? "text-bone" : "text-dim"}`}
                  >
                    {n.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-2.5 bottom-0.5 h-px origin-left bg-bronze transition-transform duration-500 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span className="hidden shrink-0 font-mono text-[11px] tracking-[0.18em] text-dim uppercase lg:block">
          present day · present time
        </span>
      </div>
    </header>
  );
}
