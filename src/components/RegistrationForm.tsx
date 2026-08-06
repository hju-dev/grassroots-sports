'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { generatePromptPayPayload } from '@/lib/promptpay';
import { useParams } from 'next/navigation';

const PROMPTPAY_NUMBER = process.env.NEXT_PUBLIC_PROMPTPAY_NUMBER ?? '0812345678';

type Step = 'form' | 'qr' | 'done';

interface Props {
  defaultProgram?: string;
}

const inputClass =
  'w-full rounded-lg border border-[var(--color-black)]/10 bg-white px-4 py-3 text-sm text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition';

const labelClass = 'text-xs font-semibold uppercase tracking-wider text-[var(--color-body)]';

export default function RegistrationForm({ defaultProgram }: Props) {
  const t = useTranslations('register');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';

  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(defaultProgram ?? '');

  const programs = [
    { value: 'youth', label: t('programYouth') },
    { value: 'teen', label: t('programTeen') },
    { value: 'adult', label: t('programAdult') },
    { value: 'private', label: t('programPrivate') },
  ];

  const qrPayload = generatePromptPayPayload(PROMPTPAY_NUMBER);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, program }),
      });
    } catch {
      // non-blocking — show QR regardless
    } finally {
      setLoading(false);
      setStep('qr');
    }
  }

  if (step === 'done') {
    return (
      <div className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-forest)] flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-8 h-8 text-white">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-black)] mb-3">{t('step3Title')}</h2>
        <p className="text-[var(--color-body)] mb-8 leading-relaxed">{t('step3Desc')}</p>
        <Link
          href={`/${locale}/programs`}
          className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
        >
          {t('doneBtn')}
        </Link>
      </div>
    );
  }

  if (step === 'qr') {
    return (
      <div className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 flex flex-col items-center gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-1 text-center">
            {t('promptPayLabel')}
          </p>
          <h2 className="text-2xl font-bold text-[var(--color-black)] text-center">{t('step2Title')}</h2>
        </div>
        <p className="text-sm text-[var(--color-body)] text-center leading-relaxed">{t('step2Desc')}</p>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <QRCode value={qrPayload} size={200} />
        </div>
        <p className="text-xs text-[var(--color-muted)] text-center">{t('scanInstructions')}</p>
        <div className="bg-[var(--color-forest)]/10 rounded-xl p-4 w-full">
          <p className="text-xs text-[var(--color-forest)] font-semibold text-center leading-relaxed">
            {t('step2Note')}
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => setStep('done')}
            className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
          >
            {t('paidBtn')}
          </button>
          <button
            onClick={() => setStep('done')}
            className="w-full bg-transparent border border-[var(--color-black)]/20 hover:border-[var(--color-forest)] text-[var(--color-body)] font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            {t('skipBtn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-sage)] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
      <h2 className="text-2xl font-bold text-[var(--color-black)]">{t('step1Title')}</h2>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t('labelName')}</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder={t('labelName')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t('labelEmail')}</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder={t('labelEmail')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t('labelPhone')}</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="e.g. 081 234 5678"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>{t('labelProgram')}</label>
        <select
          required
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>{t('labelProgram')}</option>
          {programs.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] disabled:opacity-60 text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        {loading ? '...' : t('submitBtn')}
      </button>
    </form>
  );
}
