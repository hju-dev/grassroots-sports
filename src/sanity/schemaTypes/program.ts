import { defineField, defineType } from 'sanity';

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Pricing & Settings', default: true },
    { name: 'content', title: 'Overview' },
    { name: 'learn', title: 'What They\'ll Learn' },
    { name: 'format', title: 'Format & Who It\'s For' },
    { name: 'cta', title: 'Pathway & CTA' },
  ],
  fields: [
    // ─── BASICS ──────────────────────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      group: 'basics',
      description: 'URL identifier — must be one of: youth, teen, adult, private',
      options: { list: ['youth', 'teen', 'adult', 'private'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priceThb',
      title: 'Price (THB)',
      type: 'number',
      group: 'basics',
      description: 'Monthly fee in Thai Baht',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'pricePeriod',
      title: 'Price Period',
      type: 'string',
      group: 'basics',
      description: 'e.g. "per month", "per session"',
      initialValue: 'per month',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'sessionCount', title: 'Sessions per Month', type: 'number', group: 'basics' }),
    defineField({ name: 'sessionDurationMinutes', title: 'Session Duration (minutes)', type: 'number', group: 'basics' }),
    defineField({ name: 'maxParticipants', title: 'Max Participants per Session', type: 'number', group: 'basics' }),
    defineField({
      name: 'isActive',
      title: 'Accepting Registrations',
      type: 'boolean',
      group: 'basics',
      description: 'Turn off to hide the Register button for this program',
      initialValue: true,
    }),

    // ─── OVERVIEW ────────────────────────────────────────────
    defineField({ name: 'heroEn', title: 'Hero Headline (English)', type: 'string', group: 'content' }),
    defineField({ name: 'heroTh', title: 'Hero Headline (Thai)', type: 'string', group: 'content' }),
    defineField({ name: 'taglineEn', title: 'Tagline (English)', type: 'string', group: 'content' }),
    defineField({ name: 'taglineTh', title: 'Tagline (Thai)', type: 'string', group: 'content' }),
    defineField({ name: 'agesEn', title: 'Age Group Label (English)', type: 'string', group: 'content', description: 'e.g. "Ages 6–12 · Boys & Girls"' }),
    defineField({ name: 'agesTh', title: 'Age Group Label (Thai)', type: 'string', group: 'content' }),
    defineField({ name: 'overviewEn', title: 'Overview (English)', type: 'text', rows: 5, group: 'content' }),
    defineField({ name: 'overviewTh', title: 'Overview (Thai)', type: 'text', rows: 5, group: 'content' }),
    defineField({ name: 'philosophyLabelEn', title: 'Philosophy Label (English)', type: 'string', group: 'content', description: 'e.g. "Our Philosophy"' }),
    defineField({ name: 'philosophyLabelTh', title: 'Philosophy Label (Thai)', type: 'string', group: 'content' }),
    defineField({ name: 'philosophyEn', title: 'Philosophy Quote (English)', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'philosophyTh', title: 'Philosophy Quote (Thai)', type: 'text', rows: 4, group: 'content' }),

    // ─── WHAT THEY'LL LEARN ──────────────────────────────────
    defineField({ name: 'learnTitleEn', title: 'Section Title (English)', type: 'string', group: 'learn', description: 'e.g. "What They\'ll Learn"' }),
    defineField({ name: 'learnTitleTh', title: 'Section Title (Thai)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn1TitleEn', title: 'Card 1 — Title (English)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn1TitleTh', title: 'Card 1 — Title (Thai)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn1DescEn', title: 'Card 1 — Description (English)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn1DescTh', title: 'Card 1 — Description (Thai)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn2TitleEn', title: 'Card 2 — Title (English)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn2TitleTh', title: 'Card 2 — Title (Thai)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn2DescEn', title: 'Card 2 — Description (English)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn2DescTh', title: 'Card 2 — Description (Thai)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn3TitleEn', title: 'Card 3 — Title (English)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn3TitleTh', title: 'Card 3 — Title (Thai)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn3DescEn', title: 'Card 3 — Description (English)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn3DescTh', title: 'Card 3 — Description (Thai)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn4TitleEn', title: 'Card 4 — Title (English)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn4TitleTh', title: 'Card 4 — Title (Thai)', type: 'string', group: 'learn' }),
    defineField({ name: 'learn4DescEn', title: 'Card 4 — Description (English)', type: 'text', rows: 3, group: 'learn' }),
    defineField({ name: 'learn4DescTh', title: 'Card 4 — Description (Thai)', type: 'text', rows: 3, group: 'learn' }),

    // ─── FORMAT & WHO IT'S FOR ───────────────────────────────
    defineField({ name: 'formatTitleEn', title: 'Format — Section Title (English)', type: 'string', group: 'format' }),
    defineField({ name: 'formatTitleTh', title: 'Format — Section Title (Thai)', type: 'string', group: 'format' }),
    defineField({ name: 'formatDescEn', title: 'Format — Body (English)', type: 'text', rows: 5, group: 'format' }),
    defineField({ name: 'formatDescTh', title: 'Format — Body (Thai)', type: 'text', rows: 5, group: 'format' }),
    defineField({ name: 'forTitleEn', title: 'Who It\'s For — Title (English)', type: 'string', group: 'format' }),
    defineField({ name: 'forTitleTh', title: 'Who It\'s For — Title (Thai)', type: 'string', group: 'format' }),
    defineField({ name: 'forDescEn', title: 'Who It\'s For — Body (English)', type: 'text', rows: 5, group: 'format' }),
    defineField({ name: 'forDescTh', title: 'Who It\'s For — Body (Thai)', type: 'text', rows: 5, group: 'format' }),

    // ─── PATHWAY & CTA ───────────────────────────────────────
    defineField({ name: 'pathwayLabelEn', title: 'Pathway Label (English)', type: 'string', group: 'cta', description: 'Leave empty to hide the pathway banner' }),
    defineField({ name: 'pathwayLabelTh', title: 'Pathway Label (Thai)', type: 'string', group: 'cta' }),
    defineField({ name: 'pathwayEn', title: 'Pathway Body (English)', type: 'text', rows: 3, group: 'cta' }),
    defineField({ name: 'pathwayTh', title: 'Pathway Body (Thai)', type: 'text', rows: 3, group: 'cta' }),
    defineField({ name: 'ctaTitleEn', title: 'CTA Title (English)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaTitleTh', title: 'CTA Title (Thai)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaDescEn', title: 'CTA Description (English)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaDescTh', title: 'CTA Description (Thai)', type: 'string', group: 'cta' }),
  ],
  preview: {
    select: { title: 'slug', subtitle: 'priceThb' },
    prepare({ title, subtitle }) {
      return { title: title?.toUpperCase(), subtitle: subtitle ? `฿${subtitle}` : 'No price set' };
    },
  },
});
