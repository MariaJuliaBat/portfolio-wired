"use client";

import { sfx } from "@/lib/audio";
import { setTheme, useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        sfx.play("select");
      }}
      aria-label={`Trocar para o tema ${next === "light" ? "claro" : "escuro"}`}
      className="rounded-full border border-phosphor-dim px-3 font-crt text-lg tracking-widest text-phosphor hover:border-phosphor"
    >
      TEMA {theme === "dark" ? "ESCURO" : "CLARO"}
    </button>
  );
}
