/**
 * Toque macio de hover, sintetizado na hora com Web Audio (sem arquivo de áudio).
 * Um "toc" arredondado, tipo madeira/marimba abafada, com um eco curtinho e quente.
 * O tom varia um pouquinho a cada vez para não soar repetitivo.
 */

const VOLUME = 0.12; // ~12% do volume cheio
const MIN_GAP_MS = 80; // evita metralhadora ao passar rápido por vários elementos

let ctx: AudioContext | null = null;
let bus: GainNode | null = null;
let last = 0;
let broken = false;

function getCtx(): AudioContext | null {
  if (broken) return null;
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) {
        broken = true;
        return null;
      }
      ctx = new Ctor();
    }
    return ctx;
  } catch {
    broken = true;
    return null;
  }
}

/** Cadeia fixa: tudo passa por um filtro suave, mais um eco curto que "amolece" o som. */
function getBus(c: AudioContext): GainNode {
  if (bus) return bus;

  const master = c.createGain();
  master.gain.value = VOLUME;

  const soften = c.createBiquadFilter();
  soften.type = "lowpass";
  soften.frequency.value = 2400;
  soften.Q.value = 0.4;

  // eco curtinho, escurecido a cada repetição
  const delay = c.createDelay(0.2);
  delay.delayTime.value = 0.07;
  const fb = c.createGain();
  fb.gain.value = 0.3;
  const damp = c.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 1400;
  const wet = c.createGain();
  wet.gain.value = 0.35;

  const input = c.createGain();
  input.connect(soften);
  soften.connect(master);
  soften.connect(delay);
  delay.connect(damp).connect(fb).connect(delay);
  damp.connect(wet).connect(master);
  master.connect(c.destination);

  bus = input;
  return input;
}

/** Chamar após o primeiro clique/tecla do visitante: navegadores só liberam áudio depois de uma interação. */
export function unlockAudio() {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume().catch(() => {});
}

function tone(c: AudioContext, out: AudioNode, t: number, freq: number, peak: number, decay: number, type: OscillatorType) {
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq * 1.04, t);
  osc.frequency.exponentialRampToValueAtTime(freq, t + 0.03); // leve "assentada" no tom
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + 0.006); // ataque macio, sem estalo
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + decay + 0.02);
}

export function playClick() {
  try {
    const c = getCtx();
    // sem interação prévia o navegador mantém o contexto suspenso: simplesmente não toca
    if (!c || c.state !== "running") return;

    const now = performance.now();
    if (now - last < MIN_GAP_MS) return;
    last = now;

    const out = getBus(c);
    const t = c.currentTime;
    const base = 330 * (0.94 + Math.random() * 0.14); // ~E4, variando ±6%

    tone(c, out, t, base, 0.85, 0.16, "triangle"); // corpo
    tone(c, out, t, base * 2.0, 0.22, 0.09, "sine"); // brilho suave
    tone(c, out, t, base * 0.5, 0.45, 0.12, "sine"); // peso grave
  } catch {
    broken = true;
  }
}
