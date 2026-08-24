/**
 * Faint basketball court markings (arc, key, free-throw circle) used as
 * ambient decoration behind hero sections. Purely decorative: colored via
 * `currentColor` from the wrapping className, so hidden from screen readers.
 */
export default function CourtLines({
  className = '',
  fit = 'cover',
}: {
  className?: string;
  /**
   * 'cover' fills the section edge-to-edge (crops top of the arc on short sections).
   * 'contain' always shows the whole shape, including the empty margin above the
   * arc baked into the viewBox, so there's visible space between it and the header.
   */
  fit?: 'cover' | 'contain';
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio={fit === 'cover' ? 'xMidYMax slice' : 'xMidYMax meet'}
      aria-hidden="true"
      focusable="false"
    >
      <g className="animate-court-lines" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 60 600 A 442 442 0 0 1 940 600" />
        <rect x="420" y="430" width="160" height="170" />
        <circle cx="500" cy="430" r="80" />
      </g>
    </svg>
  );
}
