"use client";

import { useState, type FormEvent, type RefObject } from "react";
import { sfx } from "@/lib/audio";

export type CommandResult = "ok" | "error" | "none";

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  feedback: string;
  onCommand: (raw: string) => CommandResult;
};

/** Linha de comando fixa no rodapé: o jeito "de hacker" de navegar. Cada tecla faz barulho de teclado antigo. */
export function CommandLine({ inputRef, feedback, onCommand }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = onCommand(value);
    if (result === "ok") sfx.play("ok");
    if (result === "error") sfx.play("error");
    setValue("");
  };

  return (
    <div className="relative z-10 border-t border-phosphor-dim/70 bg-panel/90 px-3 py-2 font-crt text-xl tracking-wide sm:px-5">
      {feedback ? (
        <p role="status" className="mb-1 truncate text-amber">
          {feedback}
        </p>
      ) : null}
      <form onSubmit={submit} className="flex items-center gap-2">
        <label htmlFor="wired-cmd" className="shrink-0 text-phosphor-dim">
          wired@maju:~$
        </label>
        <input
          id="wired-cmd"
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            sfx.play("key");
          }}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="digite help"
          className="min-w-0 flex-1 bg-transparent text-paper placeholder:text-phosphor-dim/60 focus:outline-none"
        />
      </form>
    </div>
  );
}
