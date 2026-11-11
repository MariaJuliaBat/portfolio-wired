"use client";

import { useEffect } from "react";
import { playClick, unlockAudio } from "@/lib/click";

/** Alvos que clicam no hover: cartões de projeto (.window) e links/botões principais. */
const TARGET = ".window, a[href], button";

/**
 * Um único ouvinte no documento (delegação), sem som de fundo.
 * O áudio só destrava depois do primeiro clique/tecla do visitante; antes disso fica mudo, sem erro.
 */
export function HoverSound() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;

    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.(TARGET);
      if (!el) return;
      // só quando o mouse ENTRA no elemento, não ao mover entre filhos dele
      const from = e.relatedTarget as Node | null;
      if (from && el.contains(from)) return;
      playClick();
    };
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return null;
}
