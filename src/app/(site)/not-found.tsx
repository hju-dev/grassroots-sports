import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 text-center">
      <p
        style={{ fontFamily: 'var(--font-bebas, sans-serif)' }}
        className="text-[var(--color-lime)] text-sm font-bold uppercase tracking-widest mb-4"
      >
        404
      </p>
      <h1
        style={{ fontFamily: 'var(--font-bebas, sans-serif)' }}
        className="text-7xl md:text-9xl text-white mb-4 leading-none"
      >
        Out of Bounds
      </h1>
      <p className="text-white/50 mb-10 max-w-sm text-sm leading-relaxed">
        This page doesn't exist or has been moved. Let's get you back in play.
      </p>
      <Link
        href="/en"
        className="bg-[#2d6a4f] hover:bg-[#52b788] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        Back to Home
      </Link>
    </div>
  );
}
