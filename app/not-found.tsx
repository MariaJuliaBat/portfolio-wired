import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col justify-center px-6 sm:px-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-bronze uppercase">404 · sinal perdido</p>
      <h1 className="mt-6 text-[clamp(3rem,10vw,8rem)] leading-none font-light tracking-[-0.04em]">Nada aqui.</h1>
      <Link href="/" className="mt-12 font-mono text-xs tracking-wider text-dim hover:text-bone">
        &gt; voltar ao sinal
      </Link>
    </main>
  );
}
