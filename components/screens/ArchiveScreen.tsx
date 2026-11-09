import { AWARDS, CREDENTIALS, EDUCATION, LANGUAGES, SOFT_SKILLS } from "@/lib/data";
import { Floppy } from "../Floppy";
import { TerminalWindow } from "../TerminalWindow";

export function ArchiveScreen() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-4">
        <TerminalWindow title="Archive // formação" tag="layer 05" accent="green">
          <ul className="divide-y divide-phosphor-dim/40">
            {EDUCATION.map((e) => (
              <li key={e.title} className="py-3 first:pt-0 last:pb-0">
                <p className="font-crt text-lg tracking-[0.2em] text-amber">{e.stamp}</p>
                <h3 className="font-display text-xl leading-snug text-paper glow">{e.title}</h3>
                <p className="font-crt text-xl text-phosphor">{e.where}</p>
                <p className="mt-1 text-paper/80">{e.note}</p>
              </li>
            ))}
          </ul>
        </TerminalWindow>

        <TerminalWindow title="Archive // idiomas e soft skills" tag="A:\LANG" accent="amber">
          <ul className="grid gap-x-6 gap-y-1 font-crt text-xl sm:grid-cols-2">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex items-baseline gap-3 border-b border-phosphor-dim/30 py-1">
                <span className="text-paper">{l.name}</span>
                <span className="ml-auto text-right text-base text-phosphor-dim">{l.level}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-paper/80">{SOFT_SKILLS}</p>
        </TerminalWindow>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-4">
        <TerminalWindow title="Archive // certificados" tag={`${CREDENTIALS.length} disquetes`} accent="rust">
          <ul className="divide-y divide-phosphor-dim/30">
            {CREDENTIALS.map((c) => (
              <li key={c.title} className="flex gap-3 py-2.5 first:pt-0 last:pb-0">
                <Floppy className="mt-1 size-5 shrink-0 text-amber" />
                <div className="min-w-0">
                  <p className="text-paper">{c.title}</p>
                  <p className="font-crt text-lg tracking-wide text-phosphor-dim">
                    {c.org} · {c.hours ? `${c.hours} · ` : ""}
                    {c.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </TerminalWindow>

        <TerminalWindow title="Archive // Desafio Espacial" tag="IBICT · 2024" accent="amber">
          <ul className="grid gap-2">
            {AWARDS.map((a) => (
              <li key={a.title} className="flex items-baseline gap-4">
                <span className="w-12 shrink-0 font-display text-4xl leading-none text-amber glow">{a.place}</span>
                <span className="font-crt text-xl tracking-wide text-paper">{a.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-crt text-lg tracking-wide text-phosphor-dim">
            premiação em 2025, junto do lançamento do picossatélite.
          </p>
        </TerminalWindow>
      </div>
    </div>
  );
}
