export interface GridMetrics {
  containerWidth: number;
  containerHeight: number;
  lines: { top: number; bottom: number; left: number; right: number }[];
}

export default function TypographicGrid({ metrics }: { metrics: GridMetrics | null }) {
  if (!metrics || metrics.lines.length === 0) return null;

  const { containerWidth, containerHeight, lines } = metrics;

  // Seeded random (prevents layout flicker)
  const seed = 3;
  const seededRandom = (i: number) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return x - Math.floor(x);
  };

  // Text bounding box
  const textTop = Math.min(...lines.map((l) => l.top));
  const textBottom = Math.max(...lines.map((l) => l.bottom));
  const textLeft = Math.min(...lines.map((l) => l.left));
  const textRight = Math.max(...lines.map((l) => l.right));

  // Extended grid area (lets lines fade off-screen)
  const gridTop = textTop - 250;
  const gridBottom = textBottom + 300;
  const gridLeft = textLeft - 150;
  const gridRight = textRight + 120;
  const gridWidth = gridRight - gridLeft;
  const gridHeight = gridBottom - gridTop;

  // Vertical lines (randomly spaced)
  const verticalLines: { x: number; opacity: number; width: number }[] = [];
  const vertCount = 40;
  for (let i = 0; i < vertCount; i++) {
    const r1 = seededRandom(i);
    const r2 = seededRandom(i + 100);
    const r3 = seededRandom(i + 200);

    // Organic clustering (dense spots & gaps)
    const rawX = r1;
    const skewed = rawX < 0.5
      ? Math.pow(rawX * 2, 0.7) * 0.5    // compress left
      : 0.5 + Math.pow((rawX - 0.5) * 2, 1.4) * 0.5; // stretch right
    const x = gridLeft + skewed * gridWidth;

    const opacity = 0.1 + r2 * 0.16;
    const width = r3 > 0.75 ? 0.7 : 0.4;

    verticalLines.push({ x, opacity, width });
  }

  // Horizontal subdivision lines
  const subdivisions: number[] = [];
  const lineHeight = lines[0]?.bottom - lines[0]?.top;
  const subStep = lineHeight / 5;
  if (subStep > 0) {
    // Stop horizontal lines shortly past the text
    const horizontalLimitTop = textTop - 40;
    const horizontalLimitBottom = textBottom + 40;
    
    for (let y = horizontalLimitTop; y <= horizontalLimitBottom; y += subStep) {
      subdivisions.push(y);
    }
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5, overflow: "visible" }}
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Edge fades */}
        <linearGradient id="grid-fade-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="5%" stopColor="white" stopOpacity="0.5" />
          <stop offset="15%" stopColor="white" stopOpacity="1" />
          <stop offset="60%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grid-fade-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="grid-mask-v">
          <rect x={gridLeft} y={gridTop} width={gridWidth} height={gridHeight} fill="url(#grid-fade-v)" />
        </mask>
        <mask id="grid-mask">
          <rect x={gridLeft} y={gridTop} width={gridWidth} height={gridHeight} fill="url(#grid-fade-h)" mask="url(#grid-mask-v)" />
        </mask>
      </defs>

      <g mask="url(#grid-mask)">
        {/* Major text-aligned lines */}
        {lines.map((line, i) => (
          <g key={`major-${i}`}>
            {/* Cap-height */}
            <line
              x1={gridLeft} y1={line.top}
              x2={gridRight} y2={line.top}
              stroke="white" strokeOpacity="0.35" strokeWidth="1"
            />
            {/* Baseline (skip last) */}
            {i !== lines.length - 1 && (
              <line
                x1={gridLeft} y1={line.bottom}
                x2={gridRight} y2={line.bottom}
                stroke="white" strokeOpacity="0.35" strokeWidth="1"
              />
            )}
          </g>
        ))}

        {/* Subdivision lines */}
        {subdivisions.map((y, i) => {
          // Don't overlap major lines
          const nearMajor = lines.some(
            (l) => Math.abs(l.top - y) < 4 || Math.abs(l.bottom - y) < 4
          );
          if (nearMajor) return null;
          return (
            <line
              key={`sub-${i}`}
              x1={gridLeft} y1={y}
              x2={gridRight} y2={y}
              stroke="white" strokeOpacity="0.15" strokeWidth="0.5"
            />
          );
        })}

        {/* Vertical lines */}
        {verticalLines.map((vl, i) => (
          <line
            key={`vert-${i}`}
            x1={vl.x} y1={gridTop}
            x2={vl.x} y2={gridBottom}
            stroke="white" strokeOpacity={vl.opacity} strokeWidth={vl.width}
          />
        ))}
      </g>
    </svg>
  );
}
