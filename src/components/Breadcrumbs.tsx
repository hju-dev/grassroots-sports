import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';

export type Crumb = { label: string; href?: string };

// Rendered as a slim strip above the hero on every non-home page, and
// paired with BreadcrumbList JSON-LD so Google can show the same trail in
// search results. The last crumb (current page) never links anywhere.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="px-4 py-3 bg-[var(--color-offwhite)] border-b border-[var(--color-black)]/5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="max-w-5xl mx-auto flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-muted)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span className={isLast ? 'text-[var(--color-forest)] font-semibold' : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--color-forest)] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
