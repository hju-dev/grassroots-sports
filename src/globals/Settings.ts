import type { GlobalConfig } from 'payload';
import { isStaff } from '@/access/isStaff';
import { cardGroupField } from '@/fields/cardGroup';

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Core',
          fields: [
            { name: 'siteName', type: 'text' },
            { name: 'contactEmail', type: 'email', required: true },
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social Link', plural: 'Social Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'X'],
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              name: 'announcementBanner',
              type: 'text',
              localized: true,
              admin: { description: 'Optional — shown at the top of every page when filled in.' },
            },
            {
              name: 'registrationsOpen',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Turn off to temporarily disable all registration forms site-wide.' },
            },
            {
              name: 'promptpayNumber',
              type: 'text',
              required: true,
              admin: {
                description: 'Grass Roots Sports-specific: Thai PromptPay phone number/ID. Not part of the reusable template — a future client outside Thailand would drop this field.',
              },
            },
            {
              name: 'seo',
              type: 'group',
              label: 'SEO Defaults',
              fields: [
                { name: 'metaTitle', type: 'text', localized: true },
                { name: 'metaDescription', type: 'textarea', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Homepage',
          fields: [
            { name: 'heroHeadline', type: 'text', localized: true },
            { name: 'heroSubheadline', type: 'text', localized: true },
            { name: 'missionTitle', type: 'text', localized: true },
            cardGroupField('missionCards'),
            { name: 'igSectionTitle', type: 'text', localized: true, label: 'Instagram Section — Title' },
            { name: 'igSectionSubtitle', type: 'text', localized: true, label: 'Instagram Section — Subtitle' },
          ],
        },
        {
          label: 'About Page',
          fields: [
            { name: 'aboutHeadline', type: 'text', localized: true },
            { name: 'aboutSubtitle', type: 'text', localized: true },
            { name: 'whyTitle', type: 'text', localized: true, label: 'Why Section — Title' },
            cardGroupField('whyCards'),
            { name: 'comingTitle', type: 'text', localized: true, label: '"Coming to Pattaya" — Title' },
            { name: 'comingDesc', type: 'textarea', localized: true, label: '"Coming to Pattaya" — Body' },
          ],
        },
        {
          label: 'Contact Page',
          fields: [
            { name: 'contactHeadline', type: 'text', localized: true },
            { name: 'contactSubtitle', type: 'text', localized: true },
            { name: 'locationDesc', type: 'text', localized: true, label: 'Location Line 1', admin: { description: 'e.g. "Coming to Pattaya, Thailand"' } },
            { name: 'locationSub', type: 'text', localized: true, label: 'Location Line 2', admin: { description: 'e.g. "Exact venue to be announced."' } },
          ],
        },
      ],
    },
  ],
};
