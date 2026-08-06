'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [state, setState] = useState<State>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 text-center flex flex-col items-center justify-center min-h-64">
        <div className="w-14 h-14 rounded-full bg-[var(--color-forest)] flex items-center justify-center mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-7 h-7 text-white">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--color-black)] mb-2">{t('formSuccess')}</h3>
        <p className="text-sm text-[var(--color-muted)]">{t('formSuccessSub')}</p>
        <a
          href="https://instagram.com/akdovey"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-sm font-bold text-[var(--color-forest)] hover:text-[var(--color-lime)] transition-colors uppercase tracking-widest"
        >
          @akdovey
        </a>
      </div>
    );
  }

  const inputClass = 'w-full rounded-lg border border-[var(--color-black)]/10 bg-white px-4 py-3 text-sm text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition';

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
      <h3 className="text-2xl font-bold text-[var(--color-black)]">{t('formTitle')}</h3>

      {state === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-sm text-red-700">{t('formError')}</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">{t('formName')}</label>
        <input type="text" name="name" required className={inputClass} placeholder={t('formName')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">{t('formEmail')}</label>
        <input type="email" name="email" required className={inputClass} placeholder={t('formEmail')} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">{t('formMessage')}</label>
        <textarea name="message" required rows={5} className={`${inputClass} resize-none`} placeholder={t('formMessage')} />
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        {state === 'loading' ? '...' : t('formSubmit')}
      </button>
    </form>
  );
}
