/**
 * A large, soft, blurred lime glow that slowly drifts behind hero content —
 * ambient motion layered beneath the court lines. Purely decorative.
 */
export default function HeroGlow({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`hero-glow-blob pointer-events-none absolute h-[60vmax] w-[60vmax] rounded-full ${className}`}
    />
  );
}
