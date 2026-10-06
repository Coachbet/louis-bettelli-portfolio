type Point = { x: string; y: number };

export function LineChart({
  points,
  height = 180,
  formatY,
}: {
  points: Point[];
  height?: number;
  formatY?: (v: number) => string;
}) {
  if (points.length === 0) return null;

  const width = 640;
  const padding = { top: 16, right: 16, bottom: 24, left: 8 };
  const values = points.map((p) => p.y);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const coords = points.map((p, i) => {
    const px =
      padding.left + (points.length === 1 ? 0 : (i / (points.length - 1)) * innerW);
    const py = padding.top + innerH - ((p.y - min) / range) * innerH;
    return { px, py, label: p.x, value: p.y };
  });

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.px.toFixed(1)} ${c.py.toFixed(1)}`)
    .join(" ");

  const lastCoord = coords[coords.length - 1];
  const firstCoord = coords[0];
  const baseline = (padding.top + innerH).toFixed(1);
  const areaPath =
    `${linePath} L ${lastCoord.px.toFixed(1)} ${baseline} ` +
    `L ${firstCoord.px.toFixed(1)} ${baseline} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="none"
      style={{ height }}
    >
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineFill)" stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke="url(#lineStroke)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {coords.map((c, i) => (
        <circle key={i} cx={c.px} cy={c.py} r={2.5} fill="var(--accent)" />
      ))}
      {formatY && (
        <>
          <text
            x={padding.left}
            y={padding.top + 4}
            fontSize="10"
            fill="var(--muted)"
          >
            {formatY(max)}
          </text>
          <text
            x={padding.left}
            y={padding.top + innerH}
            fontSize="10"
            fill="var(--muted)"
          >
            {formatY(min)}
          </text>
        </>
      )}
    </svg>
  );
}
