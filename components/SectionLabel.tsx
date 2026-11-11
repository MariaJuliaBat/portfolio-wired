export function SectionLabel({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-mono text-[11px] tracking-[0.22em] text-dim uppercase ${className}`}>
      <span className="text-bronze">{n}</span>
      <span className="mx-3 inline-block h-px w-6 bg-faint align-middle" />
      {children}
    </h2>
  );
}
