"use client";

import { sfx } from "@/lib/audio";
import { AWARDS, BOUNTIES, CREDENTIALS, PROFILE, SCREENS, type ScreenId } from "@/lib/data";
import { PixelMaju } from "./PixelMaju";

type Props = {
  current: ScreenId;
  onGo: (id: ScreenId) => void;
};

const TICKER = [
  `${BOUNTIES.length} bounties no radar`,
  `${CREDENTIALS.length} certificados guardados`,
  `${AWARDS.length} prêmios no Desafio Espacial`,
  "cerca de 3 mil visitantes no SESI Lab",
  "15 escolas públicas com o Rede +Ciência",
  "720h de Full-Stack",
  "present day. present time.",
  "see you, space cowboy…",
];

/**
 * Rodapé de todas as telas: faixa de notícias rolando, "faixa anterior / próxima"
 * (a navegação linear para quem prefere) e a despedida com a Maju em pixel.
 */
export function PageFooter({ current, onGo }: Props) {
  const i = SCREENS.findIndex((s) => s.id === current);
  const prev = i > 0 ? SCREENS[i - 1] : null;
  const next = i < SCREENS.length - 1 ? SCREENS[i + 1] : SCREENS[0];

  const go = (id: ScreenId) => {
    sfx.play("select");
    onGo(id);
  };

  return (
    <footer className="mt-10 space-y-4">
      <div className="overflow-hidden rounded-full border border-phosphor-dim/40 bg-panel/60 py-1" aria-hidden="true">
        <div className="marquee flex w-max font-crt text-lg tracking-widest text-phosphor-dim">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0">
              {TICKER.map((t) => (
                <li key={t} className="px-6">
                  <span className="mr-6 text-amber">◦</span>
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <nav aria-label="Faixas vizinhas" className="flex flex-wrap items-center justify-between gap-3 font-crt text-xl tracking-widest">
        {prev ? (
          <button
            type="button"
            onClick={() => go(prev.id)}
            onPointerEnter={() => sfx.play("blip")}
            className="rounded-full border border-phosphor-dim px-5 py-1 text-phosphor hover:border-phosphor hover:bg-phosphor/10"
          >
            ← {prev.key} {prev.label}
          </button>
        ) : (
          <span />
        )}
        <span className="text-base text-phosphor-dim">
          layer {String(i + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => go(next.id)}
          onPointerEnter={() => sfx.play("blip")}
          className="rounded-full border border-amber bg-amber px-5 py-1 text-ink hover:bg-transparent hover:text-amber"
        >
          {i === SCREENS.length - 1 ? "voltar ao início" : "próxima faixa"} · {next.key} {next.label} →
        </button>
      </nav>

      <div className="flex flex-wrap items-center gap-4 border-t border-phosphor-dim/40 pt-4">
        <PixelMaju className="w-12 shrink-0" animated={false} />
        <div className="min-w-0 flex-1 font-crt text-lg leading-tight tracking-wide">
          <p className="text-paper">obrigada por navegar. a Wired fica ligada.</p>
          <p className="text-phosphor-dim">© 2026 Maria Júlia Batista · MJB-01</p>
        </div>
        <div className="flex flex-wrap gap-2 font-crt text-lg tracking-widest">
          {[
            ["GITHUB", PROFILE.github],
            ["LINKEDIN", PROFILE.linkedin],
            ["E-MAIL", `mailto:${PROFILE.email}`],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              onPointerEnter={() => sfx.play("blip")}
              className="rounded-full border border-phosphor-dim px-3 text-phosphor hover:border-amber hover:text-amber"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
