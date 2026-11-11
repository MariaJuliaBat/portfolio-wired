"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

/** Arquivo de projetos: cada um é uma "janela" que ganha foco no hover. O detalhe completo abre num modal. */
export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <section id="arquivo" className="px-6 py-24 sm:px-12 sm:py-36">
      <div className="grid grid-cols-12">
        <SectionLabel n="02" className="col-span-12 md:col-span-3">
          arquivo
        </SectionLabel>

        <ul className="col-span-12 mt-10 grid gap-5 md:col-span-9 md:col-start-4 md:mt-0 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="panel window flex h-full w-full flex-col text-left"
                aria-label={`${p.name}: ver detalhes`}
              >
                <span className="titlebar w-full">
                  <span>
                    {p.id} — {p.kind}
                  </span>
                  <span>{p.year}</span>
                </span>

                <span className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="text-2xl font-normal tracking-tight sm:text-[1.65rem]">{p.name}</span>
                  <span className="mt-3 text-[15px] leading-relaxed text-bone/65">{p.summary}</span>

                  {/* aparece quando a janela ganha foco */}
                  <span className="reveal mt-4 flex gap-2 font-mono text-[11.5px] leading-relaxed text-bone/55">
                    <span className="text-bronze">↳</span>
                    {p.points[0]}
                  </span>

                  <span className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <span className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="reveal shrink-0 font-mono text-[10.5px] tracking-wider text-mint">abrir +</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="sheet"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
      >
        {open && (
          <div>
            <div className="titlebar text-mint">
              <span>
                {open.id} — {open.kind} · {open.year}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="text-dim hover:text-bone" aria-label="Fechar">
                esc ✕
              </button>
            </div>

            <div className="p-8 sm:p-10">
              <h3 className="text-4xl font-light tracking-tight">{open.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-bone/65">{open.summary}</p>

              <ul className="mt-8 space-y-3 border-t border-line pt-8 text-[15px] leading-relaxed text-bone/80">
                {open.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-bronze" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
                <span className="flex flex-wrap gap-1.5">
                  {open.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
                <a
                  href={open.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs tracking-wider text-mint underline-offset-4 hover:underline"
                >
                  ver código ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
