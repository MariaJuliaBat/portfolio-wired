import type { ReactNode } from "react";

type Props = {
  title: string;
  /** texto curto à direita da barra de título (ex.: "layer 02") */
  tag?: string;
  accent?: "green" | "amber" | "rust";
  className?: string;
  children: ReactNode;
};

const ACCENT = {
  green: {
    box: "border-phosphor-dim/60 shadow-[0_0_30px_-14px_var(--c-phosphor)]",
    text: "text-phosphor",
  },
  amber: {
    box: "border-amber/45 shadow-[0_0_30px_-14px_var(--c-amber)]",
    text: "text-amber",
  },
  rust: {
    box: "border-rust/45 shadow-[0_0_30px_-14px_var(--c-rust)]",
    text: "text-rust",
  },
} as const;

/**
 * Janela de dados: cantos arredondados, borda fina e um brilho suave na cor do destaque.
 */
export function TerminalWindow({ title, tag, accent = "green", className = "", children }: Props) {
  const a = ACCENT[accent];
  return (
    <section className={`flex min-w-0 flex-col rounded-2xl border bg-panel/80 backdrop-blur-[2px] ${a.box} ${className}`}>
      <header
        className={`flex items-center gap-3 rounded-t-2xl border-b border-phosphor-dim/40 px-4 py-1.5 font-crt text-lg tracking-widest ${a.text}`}
      >
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="block size-2 rounded-full bg-current" />
          <i className="block size-2 rounded-full border border-current" />
          <i className="block size-2 rounded-full border border-current" />
        </span>
        <h2 className="glow truncate uppercase">{title}</h2>
        {tag ? <span className="ml-auto shrink-0 text-base opacity-70">{tag}</span> : null}
      </header>
      <div className="relative flex-1 rounded-b-2xl p-4 sm:p-5">{children}</div>
    </section>
  );
}
