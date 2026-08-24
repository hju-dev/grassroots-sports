/**
 * A soft glow centered on the same point as CourtLines' three-point arc
 * (bottom-center of the section, both in "cover" and "contain" fit modes).
 * Since the section clips with overflow-hidden, only the upper half of this
 * circle is ever visible — so as it breathes (scales + fades), it reads as
 * light pulsing outward along the arc itself, hoop-out.
 */
export default function HeroArcGlow({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`hero-arc-glow pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[90%] rounded-full ${className}`}
    />
  );
}
