import { MISSION } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

/** O marco: o picossatélite. */
export function Mission() {
  return (
    <section id="missao" className="px-6 py-24 sm:px-12 sm:py-36">
      <div className="grid grid-cols-12">
        <SectionLabel n="03" className="col-span-12 md:col-span-3">
          missão
        </SectionLabel>

        <article className="panel relative col-span-12 mt-10 overflow-hidden border-t-bronze/60 md:col-span-9 md:col-start-4 md:mt-0">
          <Orbit />

          <div className="titlebar relative">
            <span>
              {MISSION.org} · {MISSION.years}
            </span>
            <span className="text-bronze">marco ✦</span>
          </div>

          <div className="relative p-6 sm:p-10">
            <h3 className="text-4xl font-light tracking-tight sm:text-5xl">{MISSION.title}</h3>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bone/70">{MISSION.summary}</p>

            {/* os dois números que importam */}
            <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
              <Stat big="3º" label="lugar geral" note="entre as equipes do Desafio Espacial" />
              <Stat big="2025" label="lançado na Índia" note="com apoio da Agência Espacial Brasileira" />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10.5px] tracking-[0.16em] text-dim uppercase">a construção</p>
                <dl className="mt-3">
                  {MISSION.facts.map((f) => (
                    <div key={f.k} className="flex justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0">
                      <dt className="font-mono text-[11px] tracking-wider text-dim">{f.k}</dt>
                      <dd className="text-right">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="font-mono text-[10.5px] tracking-[0.16em] text-dim uppercase">prêmios</p>
                <ul className="mt-3">
                  {MISSION.awards.map((a) => (
                    <li key={a.title} className="flex items-baseline gap-4 border-b border-line py-2.5 text-sm last:border-0">
                      <span className="w-7 font-serif text-xl leading-none text-bronze italic">{a.place}</span>
                      <span className="text-bone/85">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={MISSION.href}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block font-mono text-xs tracking-wider text-mint/85 underline-offset-4 hover:text-mint hover:underline"
            >
              ler a matéria no Metrópoles ↗
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function Stat({ big, label, note }: { big: string; label: string; note: string }) {
  return (
    <div className="bg-[#121318] p-6">
      <p className="font-serif text-6xl leading-none text-bronze italic">{big}</p>
      <p className="mt-4 text-lg">{label}</p>
      <p className="mt-1 text-[13px] text-dim">{note}</p>
    </div>
  );
}

/** Uma órbita fina, com o satélite parado num ponto dela. */
function Orbit() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -top-28 -right-28 w-[28rem] opacity-70" viewBox="0 0 400 400" fill="none">
      <ellipse cx="200" cy="200" rx="180" ry="70" transform="rotate(-24 200 200)" stroke="rgb(184 149 92 / 0.18)" />
      <ellipse cx="200" cy="200" rx="120" ry="46" transform="rotate(-24 200 200)" stroke="rgb(255 255 255 / 0.05)" />
      <circle cx="36" cy="273" r="2.5" fill="var(--c-mint)" />
    </svg>
  );
}
