export function FilmGrain() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.035]"
      aria-hidden="true"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}

export function DotGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 dot-grid"
      aria-hidden="true"
    />
  );
}
