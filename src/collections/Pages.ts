import type { CollectionConfig } from 'payload';
import { publishedOnly } from '@/access/publishedOnly';
import { isStaff } from '@/access/isStaff';
import { HeroBlock } from '@/blocks/Hero';
import { RichTextBlock } from '@/blocks/RichTextBlock';
import { CTABlock } from '@/blocks/CTA';
import { ImageGridBlock } from '@/blocks/ImageGrid';

// Scaffolded for the reusable template. Not consumed by any grassroots-sports
// route yet — every current page on this site is a bespoke hand-coded
// template (see src/app/[locale]/*), which is the right call for a small,
// fully-designed site. This collection exists so a future client who wants
// client-editable freeform pages (e.g. a landing page per campaign) doesn't
// need new collection scaffolding — they just start using it.
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [HeroBlock, RichTextBlock, CTABlock, ImageGridBlock],
    },
  ],
};
