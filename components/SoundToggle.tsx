"use client";

import { useSyncExternalStore } from "react";
import { getServerSoundEnabled, getSoundEnabled, sfx, subscribeSound, toggleSound } from "@/lib/audio";

export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, getSoundEnabled, getServerSoundEnabled);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Desligar o som" : "Ligar o som"}
      onClick={async () => {
        const now = await toggleSound();
        if (now) sfx.play("ok");
      }}
      className={`rounded-full border px-3 font-crt text-lg tracking-widest ${
        on ? "border-amber bg-amber text-ink" : "border-phosphor-dim text-phosphor hover:border-phosphor"
      }`}
    >
      SOM {on ? "ON" : "OFF"}
    </button>
  );
}
