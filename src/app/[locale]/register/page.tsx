import { getTranslations } from 'next-intl/server';
import RegistrationForm from '@/components/RegistrationForm';

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;
  const t = await getTranslations('register');

  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-black)] to-[var(--color-forest)] text-white py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">{t('headline')}</h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-lg mx-auto">
          <RegistrationForm defaultProgram={program} />
        </div>
      </section>
    </>
  );
}
