import type { CollectionConfig } from 'payload';
import { isStaff } from '@/access/isStaff';
import { cardGroupField } from '@/fields/cardGroup';

// Generalized "sellable/bookable offering" collection. For Grass Roots Sports
// this holds the 4 basketball programs (youth/teen/adult/private); a future
// client in a different vertical reuses the same shape for whatever they sell.
export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'priceAmount', 'isActive'],
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Pricing & Settings',
          fields: [
            {
              name: 'slug',
              type: 'select',
              required: true,
              // Client-specific: these 4 options are Grass Roots Sports' actual
              // program lineup. A future client renames/replaces this list.
              options: [
                { label: 'Youth', value: 'youth' },
                { label: 'Teen', value: 'teen' },
                { label: 'Adult', value: 'adult' },
                { label: 'Private', value: 'private' },
              ],
              admin: {
                description: 'URL identifier for this product.',
                condition: (_, __, { user }) => user?.role === 'admin',
              },
            },
            {
              name: 'priceAmount',
              type: 'number',
              required: true,
              min: 0,
              admin: { description: 'Price in the site\'s local currency.' },
            },
            {
              name: 'pricePeriod',
              type: 'text',
              required: true,
              defaultValue: 'per month',
              admin: { description: 'e.g. "per month", "per session"' },
            },
            { name: 'sessionCount', type: 'number', admin: { description: 'Sessions per month.' } },
            { name: 'sessionDurationMinutes', type: 'number' },
            { name: 'maxParticipants', type: 'number', admin: { description: 'Max participants per session.' } },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Turn off to hide the Register button for this product.' },
            },
          ],
        },
        {
          label: 'Overview',
          fields: [
            { name: 'hero', type: 'text', localized: true, label: 'Hero Headline' },
            { name: 'tagline', type: 'text', localized: true },
            { name: 'ages', type: 'text', localized: true, label: 'Age Group Label', admin: { description: 'e.g. "Ages 6–12 · Boys & Girls"' } },
            { name: 'overview', type: 'textarea', localized: true },
            { name: 'philosophyLabel', type: 'text', localized: true, admin: { description: 'e.g. "Our Philosophy"' } },
            { name: 'philosophy', type: 'textarea', localized: true, label: 'Philosophy Quote' },
          ],
        },
        {
          label: "What They'll Learn",
          fields: [
            { name: 'learnTitle', type: 'text', localized: true, label: 'Section Title' },
            cardGroupField('learnCards'),
          ],
        },
        {
          label: "Format & Who It's For",
          fields: [
            { name: 'formatTitle', type: 'text', localized: true },
            { name: 'formatDesc', type: 'textarea', localized: true },
            { name: 'forTitle', type: 'text', localized: true, label: "Who It's For — Title" },
            { name: 'forDesc', type: 'textarea', localized: true, label: "Who It's For — Body" },
          ],
        },
        {
          label: 'Pathway & CTA',
          fields: [
            { name: 'pathwayLabel', type: 'text', localized: true, admin: { description: 'Leave empty to hide the pathway banner.' } },
            { name: 'pathway', type: 'textarea', localized: true, label: 'Pathway Body' },
            { name: 'ctaTitle', type: 'text', localized: true },
            { name: 'ctaDesc', type: 'text', localized: true },
          ],
        },
      ],
    },
  ],
};
