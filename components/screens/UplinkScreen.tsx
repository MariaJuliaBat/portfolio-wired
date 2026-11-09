"use client";

import { sfx } from "@/lib/audio";
import { PROFILE } from "@/lib/data";
import { GlitchText } from "../GlitchText";
import { RetroComputer } from "../RetroComputer";
import { TerminalWindow } from "../TerminalWindow";

const CHANNELS = [
  { tag: "CH-01", label: "E-MAIL", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { tag: "CH-02", label: "GITHUB", value: "github.com/MariaJuliaBat", href: PROFILE.github },
  { tag: "CH-03", label: "LINKEDIN", value: "linkedin.com/in/maria-julia-batista", href: PROFILE.linkedin },
] as const;

export function UplinkScreen() {
  return (
    <TerminalWindow title="Uplink // canais abertos" tag="layer 06" accent="rust">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="max-w-xl text-paper/90">
            Se o assunto é vaga, projeto ou uma ideia que precisa de API, escolha uma frequência. Respondo por onde chegar
            primeiro.
          </p>

          <ul className="mt-6 divide-y divide-phosphor-dim/40 border-y border-phosphor-dim/40">
            {CHANNELS.map((c) => (
              <li key={c.tag}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onPointerEnter={() => sfx.play("blip")}
                  onClick={() => sfx.play("select")}
                  className="group grid items-baseline gap-x-6 rounded-xl px-3 py-4 hover:bg-amber hover:text-ink sm:grid-cols-[4.5rem_10.5rem_minmax(0,1fr)_auto]"
                >
                  <span className="font-crt text-xl text-phosphor-dim group-hover:text-ink/70">{c.tag}</span>
                  <span className="font-display text-2xl text-paper group-hover:text-ink">{c.label}</span>
                  <span className="break-all font-crt text-xl text-amber group-hover:text-ink">{c.value}</span>
                  <span aria-hidden="true" className="hidden font-crt text-2xl sm:inline">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-[290px]">
          <RetroComputer email={PROFILE.email} />
        </div>
      </div>

      <div className="mt-10 text-center">
        <GlitchText text="PRESENT DAY. PRESENT TIME." className="font-crt text-2xl tracking-[0.3em] text-phosphor glow" />
        <p className="mt-2 font-crt text-lg tracking-[0.3em] text-phosphor-dim">see you, space cowboy…</p>
      </div>
    </TerminalWindow>
  );
}
