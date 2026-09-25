'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { sendGAEvent } from '@next/third-parties/google';
import { generatePromptPayPayload } from '@/lib/promptpay';
import { useParams } from 'next/navigation';
import { readConsent } from '@/lib/consent';

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
  const [website, setWebsite] = useState(''); // honeypot — real users never fill this in
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentGuardian, setConsentGuardian] = useState(false);
  const [consentPhotos, setConsentPhotos] = useState(false);
  const [error, setError] = useState('');
  const needsGuardian = program === 'youth' || program === 'teen';

  const programs = [
    { value: 'youth', label: t('programYouth') },
    { value: 'teen', label: t('programTeen') },
    { value: 'adult', label: t('programAdult') },
    { value: 'private', label: t('programPrivate') },
  ];

  const qrPayload = generatePromptPayPayload(PROMPTPAY_NUMBER);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!consentPrivacy || (needsGuardian && !consentGuardian)) {
      setError(t('consentError'));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, program, website, locale,
          consentPrivacy, consentGuardian: needsGuardian ? consentGuardian : false, consentPhotos,
        }),
      });
      // A 400 means the details or consent were rejected: stay on the form so
      // nothing is silently lost. Other failures stay non-blocking, as before.
      if (res.status === 400) {
        setError(t('submitError'));
        setLoading(false);
        return;
      }
    } catch {
      // non-blocking — show QR regardless
    } finally {
      setLoading(false);
      setStep('qr');
      // Honeypot filled means it's a bot, not real registration intent —
      // don't let it pollute the conversion count. GA has no server-side
      // visibility into the honeypot check /api/register does, so this
      // client-side guard is the only place to exclude it.
      if (!website && readConsent() === 'granted') {
        sendGAEvent('event', 'register_started', { program });
      }
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
          className="inline-block bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
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
            className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white hover:text-[var(--color-black)] font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
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

      {/* Honeypot — hidden from real users, catches basic bots */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-name" className={labelClass}>{t('labelName')}</label>
        <input
          id="register-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder={t('labelName')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-email" className={labelClass}>{t('labelEmail')}</label>
        <input
          id="register-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder={t('labelEmail')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-phone" className={labelClass}>{t('labelPhone')}</label>
        <input
          id="register-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder={t('placeholderPhone')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="register-program" className={labelClass}>{t('labelProgram')}</label>
        <select
          id="register-program"
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

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--color-body)]">
          <input
            type="checkbox"
            checked={consentPrivacy}
            onChange={(e) => setConsentPrivacy(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
          />
          <span>
            {t.rich('consentPrivacy', {
              link: (chunks) => (
                <Link href={`/${locale}/privacy`} className="underline text-[var(--color-forest)]">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {needsGuardian && (
          <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--color-body)]">
            <input
              type="checkbox"
              checked={consentGuardian}
              onChange={(e) => setConsentGuardian(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
            />
            <span>{t('consentGuardian')}</span>
          </label>
        )}
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--color-body)]">
          <input
            type="checkbox"
            checked={consentPhotos}
            onChange={(e) => setConsentPhotos(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-forest)]"
          />
          <span>{t('consentPhotos')}</span>
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-lime)] disabled:opacity-60 text-white hover:text-[var(--color-black)] font-bold py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        {loading ? '...' : t('submitBtn')}
      </button>
    </form>
  );
}
