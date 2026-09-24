import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {getPublishedContent} from '@/lib/content';
import {applyContentOverrides} from '@/lib/content-overlay';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = (await requestLocale) ?? routing.defaultLocale;
  const locale = (routing.locales as readonly string[]).includes(requested) ? requested : routing.defaultLocale;
  const base = (await import(`../messages/${locale}.json`)).default;

  // Text the owner has published from the dashboard is laid over the built-in
  // wording. If it can't be read, the built-in messages are used as they are.
  const overrides = (await getPublishedContent())[locale as 'en' | 'th'];

  return {
    locale,
    messages: applyContentOverrides(base, overrides, locale as 'en' | 'th')
  };
});
