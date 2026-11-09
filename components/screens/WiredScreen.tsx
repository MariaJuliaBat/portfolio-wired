import { GlitchText } from "../GlitchText";
import { TerminalWindow } from "../TerminalWindow";

const GLOSSARY: { term: string; layer: string; meaning: string }[] = [
  { term: "SIGNAL", layer: "01", meaning: "o sinal que chegou: quem eu sou." },
  {
    term: "BOUNTIES",
    layer: "02",
    meaning:
      "em Cowboy Bebop, caçadores de recompensa perseguem alvos. Meus projetos são os alvos: cada um nasceu de um problema para resolver. Cada projeto aberto é uma session.",
  },
  { term: "MODULES", layer: "03", meaning: "o que está carregado no sistema: as tecnologias que eu uso." },
  { term: "LOGBOOK", layer: "04", meaning: "o diário de bordo da minha trajetória." },
  { term: "ARCHIVE", layer: "05", meaning: "formação, certificados e prêmios, guardados em disquetes." },
  { term: "UPLINK", layer: "06", meaning: "os canais para falar comigo." },
  { term: "WIRED", layer: "07", meaning: "esta tela, que explica o resto." },
  { term: "RADAR", layer: "·", meaning: "cada ponto é um projeto. Clicar abre o arquivo." },
  { term: "MJB-01", layer: "·", meaning: "o terminal e a nave: as iniciais de Maria Júlia Batista." },
];

export function WiredScreen() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="grid grid-cols-[minmax(0,1fr)] content-start gap-4">
        <TerminalWindow title="Wired // o que é isso?" tag="layer 07" accent="amber">
          <GlitchText
            as="h3"
            text="A REDE."
            className="font-display text-4xl leading-tight text-paper glow sm:text-5xl"
          />
          <div className="mt-4 max-w-xl space-y-3 text-[15px] leading-relaxed text-paper/90">
            <p>
              Em <em>Serial Experiments Lain</em>, a Wired é a rede que liga todo mundo a todo mundo: um lugar onde o que
              está online e o que está dentro da gente começam a se misturar.
            </p>
            <p>
              Aqui ela é o nome que dei ao meu portfólio. Cada tela é uma camada dessa rede, e eu sou a navegadora: a
              pessoa que sabe por onde ir, onde as coisas estão e como chegar lá.
            </p>
            <p className="text-paper/75">
              Por baixo da brincadeira é só isso mesmo: APIs, automações e projetos meus, organizados como um sistema
              antigo que você explora com calma.
            </p>
          </div>
        </TerminalWindow>

        <TerminalWindow title="Wired // referências" tag="homenagem" accent="green">
          <ul className="space-y-4">
            <li>
              <h3 className="font-display text-xl text-amber">Serial Experiments Lain · 1998</h3>
              <p className="mt-1 text-paper/85">
                Os fios de poste lá no alto, o zumbido do tubo ligado, a tela que mistura real e virtual e a ideia de que a
                rede tem camadas (as <em>layers</em>). Por isso as faixas se chamam layer.
              </p>
            </li>
            <li>
              <h3 className="font-display text-xl text-amber">Cowboy Bebop · 1998</h3>
              <p className="mt-1 text-paper/85">
                Os bounties, as sessions, os terminais de dados dos caçadores, o cachorro mais esperto do sistema e a
                despedida de sempre: <em>see you, space cowboy</em>.
              </p>
            </li>
          </ul>
          <p className="mt-5 rounded-xl border border-dashed border-phosphor-dim/70 px-3 py-2 font-crt text-lg tracking-wide text-phosphor-dim">
            tem comandos escondidos no terminal. aperte / e tente: ein, bang, jam, lain.
          </p>
        </TerminalWindow>
      </div>

      <TerminalWindow title="Wired // como ler este site" tag="glossário" accent="rust">
        <dl className="divide-y divide-phosphor-dim/30">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="grid gap-x-4 gap-y-0.5 py-2.5 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
              <dt className="flex items-baseline gap-2 font-crt text-xl tracking-wider text-paper">
                <span className="text-base text-amber">{g.layer}</span>
                {g.term}
              </dt>
              <dd className="text-paper/80">{g.meaning}</dd>
            </div>
          ))}
        </dl>
      </TerminalWindow>
    </div>
  );
}
