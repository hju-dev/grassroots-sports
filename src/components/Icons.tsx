interface IconProps {
  className?: string;
}

export function BasketballIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="24" cy="24" r="20" />
      <line x1="4" y1="24" x2="44" y2="24" />
      <line x1="24" y1="4" x2="24" y2="44" />
      <path d="M24 4 Q8 24 24 44" />
      <path d="M24 4 Q40 24 24 44" />
    </svg>
  );
}

export function CommunityIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="15" cy="13" r="6" />
      <path d="M5 44 C5 32 25 32 25 44" />
      <circle cx="33" cy="13" r="6" />
      <path d="M23 44 C23 32 43 32 43 44" />
    </svg>
  );
}

export function GrowthIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="24" y1="44" x2="24" y2="20" />
      <path d="M24 32 C24 32 10 28 12 14 C12 14 24 20 24 32" />
      <path d="M24 24 C24 24 38 20 36 6 C36 6 24 12 24 24" />
    </svg>
  );
}

export function LightningIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M30 4 L14 26 L24 26 L18 44 L34 22 L24 22 Z" />
    </svg>
  );
}

export function TrophyIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 6 L14 20 C14 28 34 28 34 20 L34 6 Z" />
      <path d="M14 10 H8 C5 10 5 18 8 20 L14 18" />
      <path d="M34 10 H40 C43 10 43 18 40 20 L34 18" />
      <line x1="24" y1="28" x2="24" y2="36" />
      <line x1="16" y1="36" x2="32" y2="36" />
      <line x1="14" y1="42" x2="34" y2="42" />
    </svg>
  );
}

export function TargetIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className}
    >
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="4" />
    </svg>
  );
}

export function PartnerIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 32 L13 37 C9 41 3 41 3 35 C3 29 9 29 13 33 L18 28" />
      <path d="M30 16 L35 11 C39 7 45 7 45 13 C45 19 39 19 35 15 L30 20" />
      <line x1="20" y1="28" x2="28" y2="20" />
    </svg>
  );
}

export function TrendingUpIcon({ className = 'w-10 h-10' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 38 18 24 26 32 42 12" />
      <polyline points="32 12 42 12 42 22" />
    </svg>
  );
}
