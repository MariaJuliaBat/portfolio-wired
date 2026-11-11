"use client";

import { useEffect, useRef } from "react";

const LIFE = 110; // ms que cada ponto do rastro vive
const MAX_LEN = 16; // comprimento máximo do rastro, em pixels (não importa a velocidade do mouse)
const MINT = "180, 230, 212";

/**
 * Rastro do mouse: um fio finíssimo, curto e quase transparente, que some em instantes (poeira estelar).
 * Desliga sozinho em telas de toque e para quem prefere menos movimento.
 */
export function OrbitTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pts: { x: number; y: number; t: number }[] = [];
    let raf = 0;

    const draw = () => {
      const now = performance.now();
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.clearRect(0, 0, w, h);

      if (pts.length > 1) {
        // poeira estelar: do cursor para trás, no máximo MAX_LEN pixels, sumindo ao longo do caminho
        ctx.lineWidth = 0.6;
        ctx.lineCap = "round";
        let left = MAX_LEN;
        for (let i = pts.length - 1; i > 0 && left > 0; i--) {
          const b = pts[i];
          const a = pts[i - 1];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.5) continue;
          const take = Math.min(dist, left);
          const k = take / dist;
          const fade = (left / MAX_LEN) * (1 - (now - b.t) / LIFE);
          ctx.strokeStyle = `rgba(${MINT}, ${(Math.max(fade, 0) * 0.14).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + dx * k, b.y + dy * k);
          ctx.stroke();
          left -= take;
        }
      }

      raf = pts.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pts.length > 4) pts.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1] size-full" />;
}
