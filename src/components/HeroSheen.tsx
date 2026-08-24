/**
 * A faint diagonal light streak that periodically glides across a hero
 * section, like a glossy shimmer. Purely decorative.
 */
export default function HeroSheen({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`hero-sheen pointer-events-none absolute ${className}`} />;
}
