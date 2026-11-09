import { LOGBOOK } from "@/lib/data";
import { TerminalWindow } from "../TerminalWindow";

export function LogbookScreen() {
  return (
    <TerminalWindow title="Logbook // diário de bordo" tag="layer 04" accent="green">
      <ol className="relative ml-2 border-l border-phosphor-dim/70 pl-6">
        {LOGBOOK.map((e) => (
          <li key={`${e.stamp}-${e.title}`} className="relative pb-7 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[31px] top-2 size-2.5 rounded-full bg-amber" />
            <p className="font-crt text-xl tracking-[0.2em] text-amber">{e.stamp}</p>
            <h3 className="mt-0.5 font-display text-xl leading-snug text-paper glow sm:text-2xl">
              {e.title}
            </h3>
            <p className="mt-1 max-w-2xl text-paper/80">{e.detail}</p>
          </li>
        ))}
      </ol>
    </TerminalWindow>
  );
}
