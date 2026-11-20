export function SectionLabel({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`relative font-mono text-[14px] tracking-[0.22em] text-dim uppercase ${className}`}>
      <span aria-hidden className="glow-teal pointer-events-none absolute top-1/2 -left-24 h-48 w-96 -translate-y-1/2" />
      <span className="relative text-bronze">{n}</span>
      <span className="relative mx-3 inline-block h-px w-6 bg-bronze/40 align-middle" />
      <span className="relative">{children}</span>
    </h2>
  );
}
