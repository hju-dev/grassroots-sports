import { defineField, defineType } from 'sanity';

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'URL identifier — must be one of: youth, teen, adult, private',
      options: { list: ['youth', 'teen', 'adult', 'private'] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priceThb',
      title: 'Price (THB)',
      type: 'number',
      description: 'Monthly fee in Thai Baht',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'pricePeriod',
      title: 'Price Period',
      type: 'string',
      description: 'e.g. "per month", "per session"',
      initialValue: 'per month',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sessionCount',
      title: 'Sessions per Month',
      type: 'number',
      description: 'How many sessions are included',
    }),
    defineField({
      name: 'sessionDurationMinutes',
      title: 'Session Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Max Participants per Session',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Accepting Registrations',
      type: 'boolean',
      description: 'Turn off to hide the Register button for this program',
      initialValue: true,
    }),
    defineField({
      name: 'heroEn',
      title: 'Hero Headline (English)',
      type: 'string',
    }),
    defineField({
      name: 'heroTh',
      title: 'Hero Headline (Thai)',
      type: 'string',
    }),
    defineField({
      name: 'overviewEn',
      title: 'Overview (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'overviewTh',
      title: 'Overview (Thai)',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'slug', subtitle: 'priceThb' },
    prepare({ title, subtitle }) {
      return { title: title?.toUpperCase(), subtitle: subtitle ? `฿${subtitle}` : 'No price set' };
    },
  },
});
