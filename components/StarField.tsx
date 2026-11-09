"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; v: number; ph: number; f: number };
type Shot = { x: number; y: number; vx: number; vy: number; life: number };
type RGB = [number, number, number];

function toRgb(hex: string): RGB {
  const h = hex.trim().replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Céu do fundo: estrelas que piscam e derivam devagar, duas nebulosas
 * apagadas e uma estrela cadente de tempos em tempos. As cores vêm do tema,
 * então no tema claro vira uma carta celeste impressa em papel.
 */
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const c = canvas?.getContext("2d");
    if (!canvas || !c) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let stars: Star[] = [];
    let shot: Shot | null = null;
    let nextShot = last + 7000;
    let paper: RGB = [217, 236, 217];
    let amber: RGB = [255, 180, 58];
    let phos: RGB = [134, 227, 164];
    let light = false;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      paper = toRgb(cs.getPropertyValue("--c-paper"));
      amber = toRgb(cs.getPropertyValue("--c-amber"));
      phos = toRgb(cs.getPropertyValue("--c-phosphor"));
      light = document.documentElement.dataset.theme === "light";
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 8500);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.5,
        v: Math.random() * 5 + 1,
        ph: Math.random() * Math.PI * 2,
        f: Math.random() * 1.6 + 0.5,
      }));
    };

    const rgba = (col: RGB, a: number) => `rgba(${col[0]},${col[1]},${col[2]},${a})`;

    const nebula = (x: number, y: number, r: number, col: RGB, a: number) => {
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, a));
      g.addColorStop(1, rgba(col, 0));
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
    };

    const draw = (t: number, dt: number) => {
      c.clearRect(0, 0, w, h);
      nebula(w * 0.86, h * 0.18, Math.max(w, h) * 0.45, amber, light ? 0.05 : 0.07);
      nebula(w * 0.08, h * 0.92, Math.max(w, h) * 0.5, phos, light ? 0.04 : 0.08);

      const base = light ? 0.4 : 0.55;
      for (const s of stars) {
        s.x += (s.v * dt) / 1000;
        if (s.x > w + 4) s.x = -4;
        const a = Math.max(0.05, base + 0.35 * Math.sin((t / 1000) * s.f + s.ph));
        c.fillStyle = rgba(paper, a);
        c.fillRect(Math.round(s.x), Math.round(s.y), s.r, s.r);
        if (s.r > 1.6) {
          c.fillRect(Math.round(s.x) - 2, Math.round(s.y) + s.r / 2 - 0.4, s.r + 4, 0.8);
          c.fillRect(Math.round(s.x) + s.r / 2 - 0.4, Math.round(s.y) - 2, 0.8, s.r + 4);
        }
      }

      if (!reduce) {
        if (!shot && t > nextShot) {
          shot = { x: w * (0.5 + Math.random() * 0.5), y: -10, vx: -380 - Math.random() * 120, vy: 260 + Math.random() * 90, life: 1 };
          nextShot = t + 9000 + Math.random() * 9000;
        }
        if (shot) {
          shot.x += (shot.vx * dt) / 1000;
          shot.y += (shot.vy * dt) / 1000;
          shot.life -= dt / 1200;
          const tail = 90;
          const len = Math.hypot(shot.vx, shot.vy);
          const g = c.createLinearGradient(shot.x, shot.y, shot.x - (shot.vx / len) * tail, shot.y - (shot.vy / len) * tail);
          g.addColorStop(0, rgba(amber, Math.max(0, shot.life)));
          g.addColorStop(1, rgba(amber, 0));
          c.strokeStyle = g;
          c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(shot.x, shot.y);
          c.lineTo(shot.x - (shot.vx / len) * tail, shot.y - (shot.vy / len) * tail);
          c.stroke();
          if (shot.life <= 0 || shot.y > h + 20 || shot.x < -20) shot = null;
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      draw(now, dt);
      raf = window.requestAnimationFrame(frame);
    };

    const onTheme = () => {
      readColors();
      if (reduce) draw(0, 0);
    };
    const onResize = () => {
      resize();
      if (reduce) draw(0, 0);
    };

    readColors();
    resize();
    if (reduce) draw(0, 0);
    else raf = window.requestAnimationFrame(frame);

    window.addEventListener("resize", onResize);
    window.addEventListener("wired-theme-change", onTheme);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wired-theme-change", onTheme);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0" />;
}
