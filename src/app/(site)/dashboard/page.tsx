import Link from 'next/link';

const SECTIONS = [
  { href: '/dashboard/content', title: 'Text & links', body: 'Change any words on the website, in English and Thai, plus the Instagram link and the announcement bar at the top.' },
  { href: '/dashboard/images', title: 'Images', body: 'Replace the logo, the main photos on the Home and About pages, and the picture shown when the site is shared.' },
  { href: '/dashboard/gallery', title: 'Gallery', body: 'Add, describe, reorder, publish or remove the photos on the Gallery page.' },
  { href: '/dashboard/schedule', title: 'Schedule', body: 'Set which programs run on which days and at what times.' },
  { href: '/dashboard/registration', title: 'Registration form on/off', body: 'Turn the Register Interest form on or off for everyone.' },
  { href: '/ops', title: 'Sign-ups list', body: 'See who has registered and who has sent a message, and mark payments as received.' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-black)]">Website dashboard</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Pick what you want to change. Nothing you do here goes live until you press Publish or Save, and every editor has a way back to the original.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="block h-full bg-white rounded-xl border border-[var(--color-black)]/10 p-5 hover:border-[var(--color-forest)] transition-colors"
            >
              <h2 className="text-base font-bold text-[var(--color-black)] mb-1">{s.title}</h2>
              <p className="text-sm text-[var(--color-muted)] leading-snug">{s.body}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-[var(--color-forest)]">Open →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
