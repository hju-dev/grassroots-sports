import { defineField, defineType } from 'sanity';

export const news = defineType({
  name: 'news',
  title: 'News & Announcements',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleTh',
      title: 'Title (Thai)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Only published posts appear on the website',
      initialValue: false,
    }),
    defineField({
      name: 'bodyEn',
      title: 'Body (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'bodyTh',
      title: 'Body (Thai)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'titleEn', published: 'published', media: 'image' },
    prepare({ title, published, media }) {
      return { title, subtitle: published ? 'Published' : 'Draft', media };
    },
  },
});
