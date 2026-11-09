/**
 * Sobreposição de tubo CRT: scanlines, vinheta, ruído estático,
 * flicker nas bordas e uma barra de varredura que desce devagar.
 * Tudo é CSS (ver globals.css) e respeita prefers-reduced-motion.
 */
export function CRTOverlay() {
  return (
    <div aria-hidden="true">
      <div className="crt-layer crt-scan" />
      <div className="crt-layer crt-vignette" />
      <div className="crt-layer crt-noise" />
      <div className="crt-layer crt-flicker" />
      <div className="crt-layer crt-roll" />
    </div>
  );
}
