"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { enableSound, getSoundEnabled, sfx, soundPreferred } from "@/lib/audio";
import { BOUNTIES, SCREENS, type ScreenId } from "@/lib/data";
import { BootSequence } from "./BootSequence";
import { CommandLine, type CommandResult } from "./CommandLine";
import { FlyBy } from "./FlyBy";
import { Nav } from "./Nav";
import { PageFooter } from "./PageFooter";
import { PowerLines } from "./PowerLines";
import { SignalLoss } from "./SignalLoss";
import { StarField } from "./StarField";
import { StatusBar } from "./StatusBar";
import { ArchiveScreen } from "./screens/ArchiveScreen";
import { BountiesScreen } from "./screens/BountiesScreen";
import { LogbookScreen } from "./screens/LogbookScreen";
import { ModulesScreen } from "./screens/ModulesScreen";
import { SignalScreen } from "./screens/SignalScreen";
import { UplinkScreen } from "./screens/UplinkScreen";
import { WiredScreen } from "./screens/WiredScreen";

/* ---- estado "já bootou nesta sessão", lido sem causar mismatch de hidratação ---- */
type BootState = "pending" | "boot" | "ready";
const BOOT_KEY = "wired-booted";
const BOOT_EVENT = "wired-boot-change";

function subscribe(cb: () => void) {
  window.addEventListener(BOOT_EVENT, cb);
  return () => window.removeEventListener(BOOT_EVENT, cb);
}
function getSnapshot(): BootState {
  try {
    return window.sessionStorage.getItem(BOOT_KEY) === "1" ? "ready" : "boot";
  } catch {
    return "boot";
  }
}
function getServerSnapshot(): BootState {
  return "pending";
}
function writeBoot(done: boolean) {
  try {
    if (done) window.sessionStorage.setItem(BOOT_KEY, "1");
    else window.sessionStorage.removeItem(BOOT_KEY);
  } catch {
    /* storage bloqueado: segue só com o estado local */
  }
  window.dispatchEvent(new Event(BOOT_EVENT));
}

const HELP =
  "signal · wired · bounties · modules · logbook · archive · uplink · open <id|nome> · ls · whoami · reboot";

export function WiredOS() {
  const reduce = useReducedMotion();
  const bootState = useSyncExternalStore<BootState>(subscribe, getSnapshot, getServerSnapshot);
  const [bootedLocal, setBootedLocal] = useState(false);

  const [screen, setScreen] = useState<ScreenId>("signal");
  const [bountyId, setBountyId] = useState<string>(BOUNTIES[0].id);
  const [glitching, setGlitching] = useState(false);
  const [feedback, setFeedback] = useState("");

  const timers = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  /** troca de tela com perda de sinal: o conteúdo muda no meio do ruído */
  const go = useCallback(
    (next: ScreenId, bounty?: string) => {
      clearTimers();
      const apply = () => {
        setScreen(next);
        if (bounty) setBountyId(bounty);
      };
      if (reduce) {
        apply();
        sfx.play("select");
        return;
      }
      setGlitching(true);
      sfx.play("glitch");
      timers.current.push(window.setTimeout(apply, 210));
      timers.current.push(window.setTimeout(() => setGlitching(false), 640));
    },
    [reduce, clearTimers],
  );

  const finishBoot = useCallback(() => {
    setBootedLocal(true);
    writeBoot(true);
  }, []);

  const runCommand = useCallback(
    (raw: string): CommandResult => {
      const [cmd = "", ...rest] = raw.trim().toLowerCase().split(/\s+/);
      const arg = rest.join(" ");

      if (!cmd) {
        setFeedback("");
        return "none";
      }

      const target = SCREENS.find((s) => s.id === cmd);
      if (target) {
        setFeedback(`> abrindo ${target.id}…`);
        go(target.id);
        return "none";
      }

      switch (cmd) {
        case "help":
          setFeedback(HELP);
          return "ok";
        case "ls":
          setFeedback(SCREENS.map((s) => s.id).join("   "));
          return "ok";
        case "whoami":
          setFeedback("maria júlia // MariaJuliaBat // navegadora da wired");
          return "ok";
        case "ein":
          setFeedback("au! ein, o cachorro mais inteligente do sistema, mandou um oi.");
          return "ok";
        case "bang":
          setFeedback("bang.");
          return "ok";
        case "jam":
          setFeedback("3 · 2 · 1 · let's jam.");
          sfx.play("chime");
          return "none";
        case "lain":
          setFeedback("present day. present time.");
          return "ok";
        case "sudo":
          setFeedback("permissão negada. a Wired não responde a sudo.");
          return "error";
        case "reboot":
          setFeedback("");
          setBootedLocal(false);
          setScreen("signal");
          writeBoot(false);
          return "none";
        case "open": {
          const byId = BOUNTIES.find((b) => b.id === arg.padStart(3, "0"));
          const byName = BOUNTIES.find((b) => b.codename.toLowerCase().includes(arg));
          const found = arg ? (byId ?? byName) : undefined;
          if (found) {
            setFeedback(`> abrindo bounty #${found.id} ${found.codename}…`);
            go("bounties", found.id);
            return "none";
          }
          setFeedback(`bounty não encontrado: "${arg}". ids de 001 a ${BOUNTIES[BOUNTIES.length - 1].id}.`);
          return "error";
        }
        default:
          setFeedback(`comando não reconhecido: ${cmd}. digite help.`);
          return "error";
      }
    },
    [go],
  );

  /* atalhos: 1–6 trocam de faixa, "/" foca o terminal */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      const s = SCREENS.find((x) => x.key === e.key);
      if (s) go(s.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* quem já escolheu "com som" volta com o som ligado no primeiro toque
     (o navegador exige um gesto para liberar o áudio) */
  useEffect(() => {
    if (bootState !== "ready" || !soundPreferred() || getSoundEnabled()) return;
    const unlock = () => {
      void enableSound();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [bootState]);

  if (bootState === "pending") {
    return <div className="min-h-dvh bg-ink" />;
  }

  if (bootState === "boot" && !bootedLocal) {
    return (
      <>
        <StarField />
        <BootSequence onDone={finishBoot} />
      </>
    );
  }

  return (
    <>
      <StarField />
      <PowerLines />
      <FlyBy active />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <StatusBar />

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)] gap-4 p-3 sm:p-5 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
          <Nav current={screen} onGo={(id) => id !== screen && go(id)} />

          <motion.main
            key={screen}
            initial={reduce ? false : { opacity: 0, x: -10, skewX: 4 }}
            animate={{ opacity: [0, 1, 0.45, 1], x: [-10, 4, -3, 0], skewX: [4, -1, 1, 0] }}
            transition={{ duration: reduce ? 0 : 0.26, ease: "linear" }}
            className="flex min-w-0 flex-col"
          >
            <div className="flex-1">
            {screen === "signal" && (
              <SignalScreen onNavigate={(id) => go(id)} onOpenBounty={(id) => go("bounties", id)} />
            )}
            {screen === "wired" && <WiredScreen />}
            {screen === "bounties" && <BountiesScreen selectedId={bountyId} onSelect={setBountyId} />}
            {screen === "modules" && <ModulesScreen onOpenBounty={(id) => go("bounties", id)} />}
            {screen === "logbook" && <LogbookScreen />}
            {screen === "archive" && <ArchiveScreen />}
            {screen === "uplink" && <UplinkScreen />}
            </div>
            <PageFooter current={screen} onGo={(id) => go(id)} />
          </motion.main>
        </div>

        <CommandLine inputRef={inputRef} feedback={feedback} onCommand={runCommand} />
      </div>

      <SignalLoss active={glitching} />
    </>
  );
}
