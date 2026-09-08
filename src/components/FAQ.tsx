export type FAQItem = { question: string; answer: string };

// Native <details>/<summary> — an accordion with zero client JS, which
// matches how little of this site actually needs 'use client'. Paired with
// FAQPage JSON-LD so a good answer can win its own rich result in Google.
export default function FAQ({ title, items }: { title: string; items: FAQItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section className="py-16 md:py-20 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-10 md:mb-12 text-center">{title}</h2>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <details key={i} className="group bg-[var(--color-sage)] rounded-2xl px-6 py-1 open:pb-5">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-bold text-[var(--color-black)]">
                {item.question}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="w-4 h-4 shrink-0 text-[var(--color-forest)] transition-transform group-open:rotate-45"
                >
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </summary>
              <p className="text-[var(--color-body)] leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
