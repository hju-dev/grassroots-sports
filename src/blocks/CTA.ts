import type { Block } from 'payload';

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'text', localized: true },
    { name: 'buttonLabel', type: 'text', localized: true, required: true },
    { name: 'buttonHref', type: 'text', required: true },
  ],
};
