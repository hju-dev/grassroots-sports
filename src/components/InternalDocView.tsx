import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Renders a markdown document for the dashboard. react-markdown builds React
// elements and does not allow raw HTML, so document text can never inject
// markup or scripts. Styled by hand because the site has no typography plugin.
const components: Components = {
  h1: (p) => <h1 className="text-2xl font-black text-[var(--color-black)] mt-2 mb-4" {...p} />,
  h2: (p) => <h2 className="text-lg font-bold text-[var(--color-black)] mt-8 mb-3 pb-1 border-b border-[var(--color-black)]/10" {...p} />,
  h3: (p) => <h3 className="text-base font-bold text-[var(--color-black)] mt-6 mb-2" {...p} />,
  p: (p) => <p className="text-sm leading-relaxed text-[var(--color-body)] my-3" {...p} />,
  ul: (p) => <ul className="list-disc pl-6 my-3 space-y-1.5 text-sm text-[var(--color-body)]" {...p} />,
  ol: (p) => <ol className="list-decimal pl-6 my-3 space-y-2 text-sm text-[var(--color-body)]" {...p} />,
  li: (p) => <li className="leading-relaxed" {...p} />,
  strong: (p) => <strong className="font-semibold text-[var(--color-black)]" {...p} />,
  a: ({ href, ...rest }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-forest)] underline" {...rest} />
  ),
  blockquote: (p) => <blockquote className="border-l-4 border-[var(--color-lime)] pl-4 my-4 text-sm text-[var(--color-muted)]" {...p} />,
  hr: () => <hr className="my-8 border-[var(--color-black)]/10" />,
  pre: (p) => <pre className="my-4 overflow-x-auto rounded-lg bg-[var(--color-black)] p-4 text-xs leading-relaxed text-white" {...p} />,
  code: ({ className, ...rest }) =>
    className ? (
      <code className={className} {...rest} />
    ) : (
      <code className="rounded bg-[var(--color-black)]/5 px-1.5 py-0.5 text-[0.85em] text-[var(--color-black)]" {...rest} />
    ),
  table: (p) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-[var(--color-black)]/10 bg-white">
      <table className="w-full text-left text-sm" {...p} />
    </div>
  ),
  thead: (p) => <thead className="bg-[var(--color-black)]/5" {...p} />,
  th: (p) => <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-black)]" {...p} />,
  td: (p) => <td className="px-3 py-2 align-top text-[var(--color-body)] border-t border-[var(--color-black)]/5" {...p} />,
};

export default function InternalDocView({ markdown }: { markdown: string }) {
  return (
    <article className="max-w-3xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
