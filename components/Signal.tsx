import { PROFILE, STACK_CORE } from "@/lib/data";

/** Sinal: monograma, nome, título, frase, diagrama orbital e faixa de dados. */
export function Signal() {
  return (
    <section id="sinal" className="relative grid min-h-dvh grid-rows-[1fr_auto] px-6 pt-24 pb-8 sm:px-12 sm:pb-10">
      <div className="relative z-10 grid grid-cols-12 items-center gap-y-14 py-10">
        <div className="col-span-12 lg:col-span-7 lg:col-start-1 xl:col-start-2 xl:col-span-6">
          <p className="rise mb-6 font-mono text-sm tracking-[0.2em] text-bronze uppercase [animation-delay:200ms]">
            {PROFILE.role}
          </p>
          <h1 className="rise font-display text-[clamp(3rem,7.2vw,6.75rem)] leading-[0.94] font-bold tracking-[-0.03em] [animation-delay:350ms]">
            <span className="name-gradient">Maria Júlia</span>
            <br />
            <span className="name-gradient pl-[0.6em]">Batista</span>
          </h1>
          <p className="rise mt-10 max-w-sm text-lg leading-snug text-bone/85 sm:text-xl [animation-delay:600ms]">
            {PROFILE.line}
          </p>
        </div>

        <OrbitDiagram />
      </div>

      {/* faixa de dados */}
      <dl className="rise relative z-10 grid grid-cols-2 border-t border-line pt-5 font-mono text-[14px] tracking-wider sm:grid-cols-4 [animation-delay:900ms]">
        <Datum k="base" v={PROFILE.base} />
        <Datum k="formação" v={PROFILE.school} />
        <Datum k="stack" v={STACK_CORE.slice(0, 3).join(" · ")} />
        <div className="py-2">
          <dt className="text-dim uppercase">links</dt>
          <dd className="mt-1 flex gap-4">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-mint/85 hover:text-mint">
              github ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-mint/85 hover:text-mint">
              linkedin ↗
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function Datum({ k, v }: { k: string; v: string }) {
  return (
    <div className="py-2">
      <dt className="text-dim uppercase">{k}</dt>
      <dd className="mt-1 text-bone">{v}</dd>
    </div>
  );
}

/** Diagrama orbital: linhas finas, coordenadas discretas, um satélite que percorre a órbita. */
function OrbitDiagram() {
  return (
    <div aria-hidden className="rise relative col-span-12 mx-auto w-full max-w-md lg:col-span-5 lg:col-start-8 lg:max-w-none [animation-delay:500ms]">
      <div className="glow-bronze pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2" />
      <svg viewBox="0 0 460 420" fill="none" className="relative w-full font-mono" style={{ fontSize: 12 }}>
        <g stroke="rgb(255 255 255 / 0.07)" strokeWidth="1">
          <line x1="230" y1="20" x2="230" y2="400" />
          <line x1="20" y1="210" x2="440" y2="210" />
          <circle cx="230" cy="210" r="190" />
        </g>
        <g transform="rotate(-24 230 210)" strokeWidth="1">
          <ellipse cx="230" cy="210" rx="170" ry="70" stroke="rgb(184 149 92 / 0.6)" />
          <ellipse cx="230" cy="210" rx="115" ry="46" stroke="rgb(180 230 212 / 0.3)" strokeDasharray="2 5" />
          <ellipse cx="230" cy="210" rx="225" ry="94" stroke="rgb(255 255 255 / 0.08)" />
          <g transform="translate(230 210)">
            <circle r="3.5" fill="#b4e6d4">
              <animateMotion dur="26s" repeatCount="indefinite" path="M 170 0 A 170 70 0 1 1 -170 0 A 170 70 0 1 1 170 0" />
            </circle>
          </g>
        </g>
        <circle cx="230" cy="210" r="5" fill="#b8955c" />
        <circle cx="230" cy="210" r="14" stroke="rgb(184 149 92 / 0.4)" />
        <g stroke="rgb(180 230 212 / 0.45)">
          <path d="M20 30h10M25 25v10" /><path d="M430 30h10M435 25v10" />
          <path d="M20 390h10M25 385v10" /><path d="M430 390h10M435 385v10" />
        </g>
        <g fill="rgb(168 167 176)" letterSpacing="1.2">
          <text x="40" y="52">ORB-01 · LEO</text>
          <text x="40" y="70" fill="#b8955c">PICOSSAT · 2025</text>
          <text x="300" y="52">15.6°S 47.9°W</text>
          <text x="300" y="70">ALT 500 KM</text>
          <text x="40" y="378">INC 24.0°</text>
          <text x="300" y="378">T+ 00:00:00</text>
        </g>
      </svg>
    </div>
  );
}
