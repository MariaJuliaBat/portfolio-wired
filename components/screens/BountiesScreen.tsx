"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";
import { BOUNTIES, type Bounty } from "@/lib/data";
import { GlitchText } from "../GlitchText";
import { TerminalWindow } from "../TerminalWindow";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

const STATUS_STYLE: Record<Bounty["status"], string> = {
  "EM CAMPO": "text-amber",
  CAPTURADO: "text-phosphor",
  ARQUIVADO: "text-phosphor-dim",
};

export function BountiesScreen({ selectedId, onSelect }: Props) {
  const selected = BOUNTIES.find((b) => b.id === selectedId) ?? BOUNTIES[0];
  const detailRef = useRef<HTMLDivElement>(null);

  /** no celular o detalhe fica abaixo da lista: leva a tela até ele */
  const pick = (id: string) => {
    sfx.play("select");
    onSelect(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <TerminalWindow title="Big Shot // bounties" tag="layer 02" accent="amber">
        <ul className="flex flex-col font-crt text-xl tracking-wide">
          {BOUNTIES.map((b) => {
            const active = b.id === selected.id;
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => pick(b.id)}
                  onPointerEnter={() => sfx.play("blip")}
                  aria-pressed={active}
                  className={`flex w-full items-baseline gap-3 rounded-lg px-2 py-1.5 text-left ${
                    active ? "bg-amber text-ink" : "hover:bg-phosphor/10"
                  }`}
                >
                  <span className={active ? "text-ink/70" : "text-phosphor-dim"}>#{b.id}</span>
                  <span className="flex-1 truncate">{b.codename}</span>
                  <span className={`text-base ${active ? "text-ink/70" : STATUS_STYLE[b.status]}`}>{b.status}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </TerminalWindow>

      <div ref={detailRef} className="min-w-0 scroll-mt-3">
      <TerminalWindow title={`Session ${selected.id} // bounty`} tag={selected.status} accent={selected.status === "EM CAMPO" ? "rust" : "green"}>
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: [0, 1, 0.4, 1], x: [-8, 3, -2, 0] }}
          transition={{ duration: 0.22, ease: "linear" }}
        >
          <GlitchText
            as="h3"
            text={selected.codename}
            className="font-display text-3xl leading-tight text-paper glow sm:text-5xl"
          />

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="font-crt text-lg tracking-[0.25em] text-rust">ALVO</dt>
              <dd className="mt-1 text-paper/90">{selected.target}</dd>
            </div>
            <div>
              <dt className="font-crt text-lg tracking-[0.25em] text-rust">MÉTODO</dt>
              <dd className="mt-1 text-paper/90">{selected.method}</dd>
            </div>
            <div>
              <dt className="font-crt text-lg tracking-[0.25em] text-rust">ARSENAL</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span key={t} className="rounded-full border border-phosphor-dim px-3 font-crt text-lg text-phosphor">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-crt text-lg tracking-[0.25em] text-rust">ARQUIVO</dt>
              <dd className="mt-1 break-all">
                <a
                  href={selected.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-crt text-xl text-amber underline decoration-amber/40 underline-offset-4 hover:bg-amber hover:text-ink"
                >
                  {selected.hrefLabel} ↗
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>
      </TerminalWindow>
      </div>
    </div>
  );
}
