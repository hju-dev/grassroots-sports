'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up Resend email sending
    setSubmitted(true);
  }

  if (submitted) {
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

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
      <h3 className="text-2xl font-bold text-[var(--color-black)]">{t('formTitle')}</h3>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">
          {t('formName')}
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-lg border border-[var(--color-black)]/10 bg-white px-4 py-3 text-sm text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition"
          placeholder={t('formName')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">
          {t('formEmail')}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-[var(--color-black)]/10 bg-white px-4 py-3 text-sm text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition"
          placeholder={t('formEmail')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]">
          {t('formMessage')}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-[var(--color-black)]/10 bg-white px-4 py-3 text-sm text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition resize-none"
          placeholder={t('formMessage')}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        {t('formSubmit')}
      </button>
    </form>
  );
}
