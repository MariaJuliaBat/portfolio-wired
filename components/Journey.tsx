"use client";

import { useState } from "react";
import { EDUCATION, EXPERIENCE, LANGUAGES, MILESTONES, PROFILE, STACK_CORE, STACK_DOTS, type Entry } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

const TABS = [
  { id: "experiencia", label: "Experiência", items: EXPERIENCE },
  { id: "formacao", label: "Formação", items: EDUCATION },
  { id: "marcos", label: "Marcos Espaciais", items: MILESTONES },
] as const;

/** Trajetória: stack e idiomas à esquerda; à direita, abas (uma por vez) com experiência, formação e marcos. */
export function Journey() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("experiencia");
  const current = TABS.find((t) => t.id === tab)!;

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = TABS[(idx + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
    setTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <section id="trajetoria" className="px-6 py-24 sm:px-12 sm:py-36">
      <div className="grid grid-cols-12 gap-y-6">
        <SectionLabel n="04" className="col-span-12 md:col-span-2">
          trajetória
        </SectionLabel>

        <div className="col-span-12 mt-4 grid gap-14 md:col-span-10 md:col-start-3 md:mt-0 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div className="panel">
              <div className="titlebar">stack principal</div>
              <ul className="flex flex-wrap gap-x-4 gap-y-5 p-8 sm:p-10">
                {STACK_CORE.map((s) => (
                  <li key={s} className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-lg">
                    <span aria-hidden className="size-2.5 rounded-full" style={{ background: STACK_DOTS[s], boxShadow: `0 0 8px ${STACK_DOTS[s]}80` }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="titlebar">idiomas</div>
              <ul className="space-y-3 p-8 text-base text-bone/85 sm:p-10">
                {LANGUAGES.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div role="tablist" aria-label="Trajetória" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-line">
              {TABS.map((t, idx) => {
                const on = t.id === tab;
                return (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="trajetoria-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => onKey(e, idx)}
                    className={`relative pb-4 font-mono text-sm tracking-[0.16em] uppercase transition-colors ${on ? "text-bone" : "text-dim hover:text-bone"}`}
                  >
                    {t.label}
                    <span aria-hidden className={`absolute inset-x-0 -bottom-px h-px bg-bronze transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`} />
                  </button>
                );
              })}
            </div>

            <ol key={tab} id="trajetoria-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="rise mt-10 space-y-7 [animation-duration:0.5s]">
              {current.items.map((l) => (
                <Item key={l.what} l={l} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ l }: { l: Entry }) {
  return (
    <li className={`grid grid-cols-[4.5rem_1fr] gap-x-3 border-l py-1 pl-6 ${l.live ? "border-mint" : "border-line"}`}>
      <span className={`font-mono text-sm leading-7 ${l.live ? "text-mint" : "text-dim"}`}>{l.when}</span>
      <span>
        <span className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-lg leading-7 ${l.live ? "text-mint" : ""}`}>
          {l.what}
          {l.live && (
            <span className="inline-flex items-center gap-1.5 border border-mint/50 px-2 py-0.5 font-mono text-[12px] tracking-wider uppercase">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-mint" />
              em andamento
            </span>
          )}
          {l.done && <span className="border border-white/20 px-2 py-0.5 font-mono text-[12px] tracking-wider text-dim uppercase">concluído</span>}
        </span>
        <span className="mt-1 block text-[15px] leading-snug text-dim">{l.where}</span>
      </span>
    </li>
  );
}

export function Contact() {
  return (
    <section id="contato" className="px-6 pt-24 pb-40 sm:px-12 sm:pt-36">
      <div className="grid grid-cols-12 gap-y-10">
        <SectionLabel n="05" className="col-span-12 md:col-span-3">
          contato
        </SectionLabel>

        <div className="col-span-12 border-t border-line pt-10 md:col-span-9 md:col-start-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-[clamp(1.5rem,4.5vw,3.25rem)] font-light tracking-tight break-all transition-colors hover:text-mint"
          >
            {PROFILE.email}
          </a>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-wider">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-mint/85 hover:text-mint">
              github ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-mint/85 hover:text-mint">
              linkedin ↗
            </a>
            <span className="text-dim">{PROFILE.base}</span>
          </div>
        </div>
      </div>

      <p className="mt-40 text-right font-mono text-[14px] tracking-[0.18em] text-dim">see you space cowboy...</p>
    </section>
  );
}
