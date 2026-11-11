import { LANGUAGES, LOG, PROFILE, STACK_AUX, STACK_CORE } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

/** Trajetória: stack, linha do tempo e idiomas, em painéis. */
export function Journey() {
  return (
    <section id="trajetoria" className="px-6 py-24 sm:px-12 sm:py-36">
      <div className="grid grid-cols-12 gap-y-6">
        <SectionLabel n="04" className="col-span-12 md:col-span-3">
          trajetória
        </SectionLabel>

        <div className="col-span-12 mt-4 grid gap-5 md:col-span-9 md:col-start-4 md:mt-0 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-5">
            <div className="panel">
              <div className="titlebar">stack principal</div>
              <div className="p-6 sm:p-7">
                <ul className="space-y-1 text-2xl font-light tracking-tight sm:text-[1.65rem]">
                  {STACK_CORE.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {STACK_AUX.map((s) => (
                    <li key={s} className="font-mono text-[10.5px] text-dim">
                      {s}
                      <span className="pl-1.5 text-faint">/</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="panel">
              <div className="titlebar">idiomas</div>
              <ul className="space-y-1.5 p-6 text-sm text-bone/80 sm:p-7">
                {LANGUAGES.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel">
            <div className="titlebar">
              <span>linha do tempo</span>
              <span>2024 → hoje</span>
            </div>
            <ol className="px-6 py-2 sm:px-7">
              {LOG.map((l) => (
                <li key={l.what} className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-b border-line py-3.5 last:border-0">
                  <span className={`font-mono text-xs ${l.star ? "text-bronze" : "text-dim"}`}>
                    {l.when}
                    {l.star && <span className="ml-1">✦</span>}
                  </span>
                  <span>
                    {l.star ? (
                      <a href="#missao" className="block text-[15px] text-bronze underline-offset-4 hover:underline">
                        {l.what}
                      </a>
                    ) : (
                      <span className="block text-[15px]">{l.what}</span>
                    )}
                    <span className="mt-0.5 block text-[13px] leading-snug text-dim">{l.where}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
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
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-wider">
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

      <p className="mt-40 text-right font-mono text-[11px] tracking-[0.18em] text-dim/60">see you space cowboy...</p>
    </section>
  );
}
