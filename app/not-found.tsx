import Link from "next/link";
import { CRTOverlay } from "@/components/CRTOverlay";
import { GlitchText } from "@/components/GlitchText";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
        <Logo className="size-16" />
        <GlitchText as="h1" text="404" always className="font-display text-[clamp(6rem,24vw,14rem)] leading-none text-rust glow" />
        <p className="font-crt text-2xl tracking-widest text-amber">SINAL PERDIDO. ESSE ENDEREÇO NÃO EXISTE NA WIRED.</p>
        <Link href="/" className="rounded-full border border-phosphor-dim px-5 py-2 font-crt text-xl tracking-widest hover:bg-phosphor hover:text-ink">
          [ VOLTAR AO SINAL ]
        </Link>
      </main>
      <CRTOverlay />
    </>
  );
}
