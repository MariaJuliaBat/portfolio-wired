/**
 * A Maju em pixel art: grade de 32×36. Cada letra é uma cor da paleta;
 * as linhas curtas são centralizadas, as de 32 colunas vão como estão.
 * Cabelo azul de chanel com topete, óculos retangulares, pele parda, moletom lilás.
 */
const W = 32;

const PALETTE: Record<string, string> = {
  K: "#1b1738", // contorno
  H: "#3f74f2", // cabelo
  h: "#8cbcff", // brilho do cabelo
  d: "#2a4fc0", // mechas escuras
  S: "#c48a5c", // pele
  s: "#a9714b", // sombra da pele
  E: "#fff7f0", // branco do olho
  W: "#ffffff", // brilho do olho
  B: "#6b3f1f", // íris
  G: "#6a56b5", // armação dos óculos
  P: "#ff8fb0", // bochecha
  M: "#8a3a4a", // boca
  U: "#b9a2ff", // moletom
  u: "#8c74e0", // moletom, sombra
  Y: "#ffb3d4", // presilha de estrela
  Z: "#fff3fa", // cordão do capuz
  R: "#2b2150", // etiqueta
};

const ROWS: string[] = [
  ".................KK.............",
  "................KhhK............",
  "..............KHHHHK............",
  "KKKKKKKKKKKK",
  "KKhhhhhhHHHHHHKK",
  "KHHhhhhhhhhHHHHHHHHK",
  "KHHHHHHHHHHHHHHHHHHHHK",
  "KHHHdHHHHHHHHHHHHHHdHHHK",
  "KHHHYYHHHHHHHHHHHHHHHHHHHK",
  "KHHHHHdHHHHHdHHHHHdHHHHHHK",
  "KHHHHHHhhhHHHHHHHHHHHHHHHK",
  "KHHHHHHHHHHHHHHHHHHHHHHHHK",
  "KHHHHSHHSSSHHSSSSHHSSHHHHK",
  "KHhHHGGGGGGGSSGGGGGGGHHdHK",
  "KHhHHGSKKKSGGGGSKKKSGHHdHK",
  "KHhHHGEWBBEGSSGEWBBEGHHdHK",
  "KHhHHGEBKBEGSSGEBKBEGHHdHK",
  "KHHHHGSBBBSGSSGSBBBSGHHdHK",
  "KHHHHGSSSSSGSSGSSSSSGHHHHK",
  "KHHHHGGGGGGGSSGGGGGGGHHHHK",
  "KHHHHSPPSSSSSSSSSSPPSHHHHK",
  "KHHHHSSSSSSSssSSSSSSSHHHHK",
  "KHHHHSSSSSMSSSSMSSSSSHHHHK",
  "KHHHHSSSSSSMMMMSSSSSSHHHHK",
  "KHHHHKSSSSSSSSSSSSSSKHHHHK",
  "KHHHHHKSSSSSSSSSSSSKHHHHHK",
  "KHHHHHHHKKssssssKKHHHHHHHK",
  "KUUUUUUUUUKssssKUUUUUUUUUK",
  "KUUUUUUUUUUUUuuUUUUUUUUUUUUK",
  "KUUUUUUUUUUUUUZUUZUUUUUUUUUUUUUK",
  "KUUUUUUUUUUUUUZUUZUUUUUUUUUUUUUK",
  "KUUUUUUUUUUUUUZUUZUUURRRRUUUUUUK",
  "KUUUuuuuuuuuuuuuuuuuuuuuuuuuUUUK",
  "KUUUuUUUUUUUUUUUUUUUUUUUUUUuUUUK",
  "KUUUuUUUUUUUUUUUUUUUUUUUUUUuUUUK",
  "KUUUuUUUUUUUUUUUUUUUUUUUUUUuUUUK",
];

type Run = { x: number; y: number; w: number; fill: string };

/** junta pixels vizinhos da mesma cor em retângulos, para o SVG ficar leve */
function buildRuns(): Run[] {
  const runs: Run[] = [];
  ROWS.forEach((raw, y) => {
    const pad = Math.max(0, Math.floor((W - raw.length) / 2));
    const row = ".".repeat(pad) + raw;
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x;
      while (end + 1 < row.length && row[end + 1] === ch) end++;
      const fill = PALETTE[ch];
      if (fill) runs.push({ x, y, w: end - x + 1, fill });
      x = end + 1;
    }
  });
  return runs;
}

const RUNS = buildRuns();
const H = ROWS.length;

/** colunas e linhas das lentes, para a piscada cobrir só os olhos */
const EYES = [
  { x: 9, y: 15 },
  { x: 18, y: 15 },
];

type Props = {
  className?: string;
  /** liga a piscada e o brilho das faíscas */
  animated?: boolean;
};

export function PixelMaju({ className = "", animated = true }: Props) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Maju em pixel art: cabelo azul, óculos retangulares, pele parda e moletom lilás"
    >
      {RUNS.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}

      {/* piscada: pálpebras de pele por cima dos olhos */}
      {animated ? (
        <g className="px-blink">
          {EYES.map((e) => (
            <g key={e.x}>
              <rect x={e.x} y={e.y} width={5} height={3} fill={PALETTE.S} />
              <rect x={e.x} y={e.y + 1} width={5} height={1} fill={PALETTE.K} />
            </g>
          ))}
        </g>
      ) : null}

      {/* faíscas em pixel */}
      <g className={animated ? "px-twinkle" : undefined} fill="#ffc2d8">
        <rect x={2} y={7} width={1} height={3} />
        <rect x={1} y={8} width={3} height={1} />
      </g>
      <g className={animated ? "px-twinkle px-twinkle-b" : undefined} fill="#bdf3dd">
        <rect x={29} y={12} width={1} height={3} />
        <rect x={28} y={13} width={3} height={1} />
      </g>
      <g className={animated ? "px-twinkle px-twinkle-c" : undefined} fill="#ffc2a1">
        <rect x={3} y={22} width={1} height={1} />
        <rect x={28} y={24} width={1} height={1} />
      </g>
    </svg>
  );
}
