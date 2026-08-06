import { defineField, defineType } from 'sanity';

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'captionEn',
      title: 'Caption (English)',
      type: 'string',
    }),
    defineField({
      name: 'captionTh',
      title: 'Caption (Thai)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Youth', value: 'youth' },
          { title: 'Teen', value: 'teen' },
          { title: 'Adult', value: 'adult' },
          { title: 'Events', value: 'events' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'captionEn', media: 'image', subtitle: 'category' },
    prepare({ title, media, subtitle }) {
      return { title: title || 'Untitled photo', media, subtitle };
    },
  },
});
