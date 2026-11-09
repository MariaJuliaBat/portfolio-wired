import { sfx } from "@/lib/audio";
import { AUX_MODULES, BOUNTIES, CORE_MODULES } from "@/lib/data";
import { GlitchText } from "../GlitchText";
import { TerminalWindow } from "../TerminalWindow";

type Props = {
  onOpenBounty: (id: string) => void;
};

export function ModulesScreen({ onOpenBounty }: Props) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
      <TerminalWindow title="Modules // núcleo" tag="layer 03" accent="green">
        <ul className="divide-y divide-phosphor-dim/40">
          {CORE_MODULES.map((m, i) => (
            <li key={m.name} className="grid gap-x-6 gap-y-2 py-4 first:pt-0 last:pb-0 md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="flex items-baseline gap-3">
                <span className="font-crt text-xl text-phosphor-dim">0{i + 1}</span>
                <GlitchText as="h3" text={m.name} className="font-display text-3xl leading-none text-paper glow" />
              </div>
              <div>
                <p className="text-paper/90">{m.role}</p>
                <p className="mt-2 flex flex-wrap items-center gap-2 font-crt text-lg tracking-wide">
                  <span className="text-phosphor-dim">CARREGADO EM</span>
                  {m.loadedIn.length === 0 ? (
                    <span className="text-rust">ainda sem bounty no radar</span>
                  ) : (
                    m.loadedIn.map((id) => {
                      const b = BOUNTIES.find((x) => x.id === id);
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => onOpenBounty(id)}
                          onPointerEnter={() => sfx.play("blip")}
                          className="rounded-full border border-amber/70 px-3 text-amber hover:bg-amber hover:text-ink"
                        >
                          #{id} {b?.codename}
                        </button>
                      );
                    })
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </TerminalWindow>

      <TerminalWindow title="Modules // periféricos" tag="auxiliares" accent="amber">
        <ul className="flex flex-wrap gap-2 font-crt text-xl tracking-wide">
          {AUX_MODULES.map((m) => (
            <li key={m} className="rounded-full border border-phosphor-dim px-3 py-0.5 text-phosphor hover:border-amber hover:text-amber">
              {m}
            </li>
          ))}
        </ul>
      </TerminalWindow>
    </div>
  );
}
