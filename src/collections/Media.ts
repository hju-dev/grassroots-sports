import type { CollectionConfig } from 'payload';
import { isStaff } from '@/access/isStaff';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describes the image for screen readers and search engines — required for every upload.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Youth', value: 'youth' },
        { label: 'Teen', value: 'teen' },
        { label: 'Adult', value: 'adult' },
        { label: 'Events', value: 'events' },
      ],
      admin: {
        description: 'Used to filter photos on the Gallery page.',
      },
    },
  ],
};
