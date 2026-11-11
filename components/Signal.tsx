import Image from "next/image";
import { PROFILE, STACK_CORE } from "@/lib/data";

/** Sinal: monograma, nome, título, frase, cartão de identificação e faixa de dados. */
export function Signal() {
  return (
    <section id="sinal" className="relative grid min-h-dvh grid-rows-[1fr_auto] px-6 pt-24 pb-8 sm:px-12 sm:pb-10">
      <div className="relative z-10 grid grid-cols-12 items-center gap-y-14 py-10">
        <div className="col-span-12 lg:col-span-7 lg:col-start-1 xl:col-start-2 xl:col-span-6">
          <p className="rise mb-6 font-mono text-xs tracking-[0.2em] text-bronze uppercase [animation-delay:200ms]">
            {PROFILE.role}
          </p>
          <h1 className="rise text-[clamp(2.9rem,7.4vw,7rem)] leading-[0.92] font-light tracking-[-0.045em] [animation-delay:350ms]">
            Maria Júlia
            <br />
            <span className="pl-[0.8em] text-bone/90">Batista</span>
          </h1>
          <p className="rise mt-10 max-w-sm text-lg leading-snug text-bone/70 sm:text-xl [animation-delay:600ms]">
            {PROFILE.line}
          </p>
        </div>

        <IdCard />
      </div>

      {/* faixa de dados */}
      <dl className="rise relative z-10 grid grid-cols-2 border-t border-line pt-5 font-mono text-[11px] tracking-wider sm:grid-cols-4 [animation-delay:900ms]">
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

/** Cartão de identificação: foto em tom de arquivo, ganha cor no hover. */
function IdCard() {
  return (
    <figure className="idcard panel rise col-span-12 mx-auto w-full max-w-[19rem] sm:max-w-xs lg:col-span-4 lg:col-start-9 lg:max-w-none [animation-delay:500ms]">
      <div className="titlebar">
        <span>id · mjb</span>
      </div>

      <div className="p-3">
        <div className="relative overflow-hidden">
          <Image
            src="/maju.jpg"
            alt="Maria Júlia Batista sorrindo, de blusa verde, com a mão apoiada no queixo"
            width={800}
            height={1000}
            sizes="(min-width: 1024px) 26vw, 20rem"
            fetchPriority="high"
            loading="eager"
            className="aspect-[4/5] w-full object-cover"
          />
          {/* filete interno e um degradê para assentar a foto no fundo escuro */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset" />
        </div>
      </div>

      <figcaption className="grid grid-cols-2 border-t border-line font-mono text-[10.5px] tracking-wider">
        <span className="border-r border-line px-4 py-3">
          <span className="block text-dim uppercase">nome</span>
          <span className="mt-1 block text-bone">M. J. Batista</span>
        </span>
        <span className="px-4 py-3">
          <span className="block text-dim uppercase">função</span>
          <span className="mt-1 block text-bone">Back-end · Educação</span>
        </span>
      </figcaption>
    </figure>
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
