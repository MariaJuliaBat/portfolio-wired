import { sfx } from "@/lib/audio";
import { BOUNTIES, PROFILE, type ScreenId } from "@/lib/data";
import { Character } from "../Character";
import { GlitchText } from "../GlitchText";
import { Scope } from "../Scope";
import { SpaceScene } from "../SpaceScene";
import { TerminalWindow } from "../TerminalWindow";

type Props = {
  onNavigate: (id: ScreenId) => void;
  onOpenBounty: (id: string) => void;
};

const ROWS = [
  ["HANDLE", PROFILE.handle],
  ["BASE", PROFILE.base],
  ["ENLACE", PROFILE.link],
  ["STATUS", PROFILE.status],
] as const;

export function SignalScreen({ onNavigate, onOpenBounty }: Props) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <TerminalWindow title="Signal // identidade" tag="layer 01">
        <div className="absolute right-3 top-3 z-10 w-[clamp(118px,33%,225px)] sm:right-5">
          <Character />
        </div>
        <p className="font-crt text-xl tracking-[0.3em] text-phosphor-dim">TRANSMISSÃO RECEBIDA</p>

        <h1 className="mt-2 -skew-x-6 font-name text-[clamp(4.5rem,15vw,10rem)] leading-[0.82] tracking-wide text-paper">
          <GlitchText text="MARIA" always className="glow block" />
          <GlitchText text="JÚLIA" className="glow block text-amber" />
        </h1>

        <p className="mt-4 font-crt text-2xl tracking-widest text-rust glow">{PROFILE.role.toUpperCase()}</p>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/90">{PROFILE.manifesto}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-paper/75">{PROFILE.mission}</p>

        <dl className="mt-6 grid max-w-xl gap-x-6 gap-y-1 font-crt text-xl sm:grid-cols-[7rem_1fr]">
          {ROWS.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-phosphor-dim">{k}</dt>
              <dd className="text-paper">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3 font-crt text-xl tracking-widest">
          <button
            type="button"
            onClick={() => onNavigate("bounties")}
            onPointerEnter={() => sfx.play("blip")}
            className="rounded-full border border-amber bg-amber px-5 py-1.5 text-ink hover:bg-transparent hover:text-amber"
          >
            [2] ABRIR BOUNTIES
          </button>
          <button
            type="button"
            onClick={() => onNavigate("uplink")}
            onPointerEnter={() => sfx.play("blip")}
            className="rounded-full border border-phosphor-dim px-5 py-1.5 hover:border-phosphor hover:bg-phosphor/10"
          >
            [6] ABRIR UPLINK
          </button>
          <button
            type="button"
            onClick={() => onNavigate("wired")}
            onPointerEnter={() => sfx.play("blip")}
            className="rounded-full border border-rust/70 px-5 py-1.5 text-rust hover:bg-rust hover:text-ink"
          >
            [7] O QUE É A WIRED?
          </button>
        </div>
      </TerminalWindow>

      <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-4">
        <TerminalWindow title="Radar // alvos ativos" tag={`${BOUNTIES.length} ecos`} accent="amber">
          <Scope onPick={onOpenBounty} />
          <p className="mt-3 text-center font-crt text-lg tracking-widest text-phosphor-dim">
            cada ponto é um projeto. clique num eco para abrir o arquivo.
          </p>
        </TerminalWindow>

        <TerminalWindow title="Órbita // MJB-01" tag="em voo" accent="green">
          <SpaceScene onOpenSatellite={() => onOpenBounty("004")} />
        </TerminalWindow>
      </div>
    </div>
  );
}
