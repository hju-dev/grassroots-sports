import type { Block } from 'payload';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'headline', type: 'text', localized: true, required: true },
    { name: 'subheadline', type: 'text', localized: true },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaHref', type: 'text' },
  ],
};
