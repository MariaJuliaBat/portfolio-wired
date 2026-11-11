/**
 * Sininho de hover, sintetizado na hora com Web Audio (sem arquivo de áudio).
 * Notas médio-agudas de uma escala pentatônica, com parciais de metal e um eco curto e brilhante.
 * O tom varia um pouquinho a cada vez para não soar repetitivo.
 */

const VOLUME = 0.12; // ~12% do volume cheio
const MIN_GAP_MS = 110; // evita metralhadora ao passar rápido por vários elementos

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
  soften.frequency.value = 5000;
  soften.Q.value = 0.4;

  // eco curtinho, escurecido a cada repetição
  const delay = c.createDelay(0.2);
  delay.delayTime.value = 0.09;
  const fb = c.createGain();
  fb.gain.value = 0.38;
  const damp = c.createBiquadFilter();
  damp.type = "lowpass";
  damp.frequency.value = 2800;
  const wet = c.createGain();
  wet.gain.value = 0.4;

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

/** Um parcial do sino: seno puro, ataque quase instantâneo e decaimento longo. */
function partial(c: AudioContext, out: AudioNode, t: number, freq: number, peak: number, decay: number) {
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + decay + 0.02);
}

/** Notas de uma escala pentatônica: qualquer sequência soa bem junta. */
const NOTES = [784, 880, 1047, 1175, 1319]; // G5 A5 C6 D6 E6

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
    const f = NOTES[Math.floor(Math.random() * NOTES.length)];

    // sininho: fundamental + parciais "inharmônicos" de metal (razões de sino), cada um morrendo mais rápido
    partial(c, out, t, f, 0.6, 0.6);
    partial(c, out, t, f * 2.76, 0.12, 0.22);
    partial(c, out, t, f * 5.4, 0.025, 0.1);
  } catch {
    broken = true;
  }
}
