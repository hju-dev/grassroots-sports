import { defineField, defineType } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'promptpayNumber',
      title: 'PromptPay Number',
      type: 'string',
      description: 'Phone number or national ID used for PromptPay payments',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
      initialValue: 'akdovey',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
      description: 'Shown on contact and schedule pages',
    }),
    defineField({
      name: 'announcementBannerEn',
      title: 'Announcement Banner (English)',
      type: 'string',
      description: 'Optional — shown at the top of every page when filled in',
    }),
    defineField({
      name: 'announcementBannerTh',
      title: 'Announcement Banner (Thai)',
      type: 'string',
    }),
    defineField({
      name: 'registrationsOpen',
      title: 'Registrations Open',
      type: 'boolean',
      description: 'Turn off to temporarily disable all registration forms site-wide',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
