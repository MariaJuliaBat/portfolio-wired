/**
 * Motor de som do WIRED/OS. Tudo é sintetizado na hora com Web Audio
 * (osciladores e ruído), então o site não carrega nenhum arquivo de áudio.
 *
 * O navegador só libera som depois de um gesto do usuário; por isso o som
 * nasce desligado e é ligado pela tela "LIGAR COM SOM" ou pelo botão da barra.
 */

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

export type SfxName =
  | "key"
  | "tick"
  | "blip"
  | "select"
  | "ok"
  | "error"
  | "glitch"
  | "ping"
  | "whoosh"
  | "boot"
  | "chime";

const PREF_KEY = "wired-sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;
let enabled = false;
let humStop: (() => void) | null = null;
const lastPlayed = new Map<SfxName, number>();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

/* ---------- estado observável (useSyncExternalStore) ---------- */
export function subscribeSound(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
export const getSoundEnabled = () => enabled;
export const getServerSoundEnabled = () => false;

export function soundPreferred(): boolean {
  try {
    return window.localStorage.getItem(PREF_KEY) === "1";
  } catch {
    return false;
  }
}

function savePref(on: boolean) {
  try {
    window.localStorage.setItem(PREF_KEY, on ? "1" : "0");
  } catch {
    /* storage bloqueado: segue sem persistir */
  }
}

/* ---------- infraestrutura ---------- */
function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
  if (!Ctor) return null;

  ctx = new Ctor();
  const comp = ctx.createDynamicsCompressor();
  master = ctx.createGain();
  master.gain.value = 0.45;
  master.connect(comp);
  comp.connect(ctx.destination);

  const len = ctx.sampleRate * 2;
  noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return ctx;
}

/** nota com envelope: ataque curto e queda exponencial */
function tone(type: OscillatorType, f0: number, f1: number, dur: number, vol: number, delay = 0) {
  if (!ctx || !master) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.012, dur / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

/** rajada de ruído filtrado, com varredura de frequência */
function noise(
  dur: number,
  vol: number,
  filter: BiquadFilterType,
  f0: number,
  f1: number,
  delay = 0,
  q = 1,
) {
  if (!ctx || !master || !noiseBuf) return;
  const t = ctx.currentTime + delay;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const flt = ctx.createBiquadFilter();
  flt.type = filter;
  flt.Q.value = q;
  flt.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) flt.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 3));
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(flt);
  flt.connect(gain);
  gain.connect(master);
  src.start(t, Math.random() * 1.4);
  src.stop(t + dur + 0.03);
}

/** zumbido grave de monitor ligado + chiado muito baixo */
function startHum() {
  if (!ctx || !master || !noiseBuf || humStop) return;
  const c = ctx;
  const out = c.createGain();
  out.gain.value = 0;
  out.connect(master);

  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 170;
  lp.connect(out);
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 60;
  osc.connect(lp);
  osc.start();

  const hiss = c.createBufferSource();
  hiss.buffer = noiseBuf;
  hiss.loop = true;
  const hissFilter = c.createBiquadFilter();
  hissFilter.type = "lowpass";
  hissFilter.frequency.value = 1100;
  const hissGain = c.createGain();
  hissGain.gain.value = 0.18;
  hiss.connect(hissFilter);
  hissFilter.connect(hissGain);
  hissGain.connect(out);
  hiss.start();

  out.gain.linearRampToValueAtTime(0.014, c.currentTime + 2);

  humStop = () => {
    out.gain.cancelScheduledValues(c.currentTime);
    out.gain.setTargetAtTime(0, c.currentTime, 0.15);
    window.setTimeout(() => {
      osc.stop();
      hiss.stop();
      out.disconnect();
    }, 700);
    humStop = null;
  };
}

/* ---------- os efeitos ----------
   Tudo em ondas senoidais e triangulares, com volumes baixos e quedas longas:
   som de caixinha de música e teclado macio, nada de beep seco. */
const MIN_GAP: Partial<Record<SfxName, number>> = {
  key: 32,
  tick: 50,
  blip: 90,
  ping: 160,
  select: 120,
  glitch: 250,
};

const SOUNDS: Record<SfxName, () => void> = {
  // tecla macia, com um "tum" curto
  key: () => {
    const f = 200 + Math.random() * 50;
    noise(0.022, 0.05, "lowpass", 1700, 1700);
    tone("sine", f, f * 0.62, 0.05, 0.04);
  },
  tick: () => tone("sine", 1760, 1760, 0.025, 0.018),
  blip: () => tone("sine", 880, 1175, 0.08, 0.03),
  // dois toques de caixinha de música
  select: () => {
    tone("sine", 784, 784, 0.14, 0.05);
    tone("sine", 1175, 1175, 0.28, 0.04, 0.08);
  },
  ok: () => tone("triangle", 660, 880, 0.18, 0.045),
  error: () => tone("sine", 233, 175, 0.32, 0.06),
  // troca de tela: um sopro de ar com um brilho, sem chiado agressivo
  glitch: () => {
    noise(0.4, 0.04, "lowpass", 2300, 480, 0, 0.6);
    tone("sine", 523, 784, 0.3, 0.024);
    tone("sine", 1047, 1047, 0.22, 0.014, 0.12);
  },
  // eco de radar
  ping: () => {
    tone("sine", 1318, 1318, 1.1, 0.05);
    tone("sine", 1976, 1976, 0.7, 0.018, 0.02);
  },
  // nave passando: ar suave subindo e descendo
  whoosh: () => {
    noise(1.7, 0.05, "lowpass", 380, 1500, 0, 0.5);
    noise(1.5, 0.04, "lowpass", 1500, 300, 1.3, 0.5);
  },
  // tubo ligando com um "tum" grave e um sininho
  boot: () => {
    tone("sine", 58, 40, 0.85, 0.2);
    noise(0.6, 0.05, "lowpass", 900, 200, 0.05);
    tone("triangle", 784, 784, 0.45, 0.05, 0.7);
  },
  chime: () => {
    [659, 784, 988, 1319].forEach((f, i) => tone("triangle", f, f, 0.38, 0.045, i * 0.1));
  },
};

export const sfx = {
  play(name: SfxName) {
    if (!enabled || !ctx) return;
    const now = performance.now();
    const gap = MIN_GAP[name] ?? 0;
    if (now - (lastPlayed.get(name) ?? -1e9) < gap) return;
    lastPlayed.set(name, now);
    if (ctx.state === "suspended") void ctx.resume();
    SOUNDS[name]();
  },
};

/* ---------- ligar e desligar ---------- */
export async function enableSound(): Promise<boolean> {
  const c = ensureCtx();
  if (!c) return false;
  if (c.state === "suspended") await c.resume();
  enabled = true;
  startHum();
  savePref(true);
  emit();
  return true;
}

export function disableSound() {
  enabled = false;
  humStop?.();
  savePref(false);
  emit();
}

export async function toggleSound(): Promise<boolean> {
  if (enabled) {
    disableSound();
    return false;
  }
  return enableSound();
}
