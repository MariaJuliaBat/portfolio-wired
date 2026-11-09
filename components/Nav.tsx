import { sfx } from "@/lib/audio";
import { SCREENS, type ScreenId } from "@/lib/data";

type Props = {
  current: ScreenId;
  onGo: (id: ScreenId) => void;
};

/**
 * Menu de "faixas" do sistema. Em telas largas fica numa coluna;
 * no celular vira uma fila rolável no topo.
 */
export function Nav({ current, onGo }: Props) {
  return (
    <nav aria-label="Telas do sistema" className="min-w-0 lg:sticky lg:top-5 lg:self-start">
      <p className="mb-2 hidden font-crt text-lg tracking-[0.25em] text-phosphor-dim lg:block">/ FAIXAS</p>
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
        {SCREENS.map((s) => {
          const active = s.id === current;
          return (
            <li key={s.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onGo(s.id)}
                onPointerEnter={() => sfx.play("blip")}
                aria-current={active ? "page" : undefined}
                className={`group flex w-full items-baseline gap-3 rounded-xl border px-3 py-1.5 text-left font-crt text-xl tracking-widest transition-none ${
                  active
                    ? "border-amber bg-amber text-ink"
                    : "border-phosphor-dim/70 text-phosphor hover:border-phosphor hover:bg-phosphor/10"
                }`}
              >
                <span className={active ? "text-ink/70" : "text-amber"}>{s.key}</span>
                <span className="glow">{s.label}</span>
                <span className={`hidden text-base xl:inline ${active ? "text-ink/70" : "text-phosphor-dim"}`}>
                  {s.hint}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 hidden font-crt text-base leading-tight text-phosphor-dim lg:block">
        teclas 1–7 trocam de faixa.
        <br />
        &quot;/&quot; abre o terminal.
      </p>
    </nav>
  );
}
