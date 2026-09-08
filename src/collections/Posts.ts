import type { CollectionConfig } from 'payload';
import { publishedOnly } from '@/access/publishedOnly';
import { isStaff } from '@/access/isStaff';

// Scaffolded for the reusable template (replaces Sanity's dead, never-wired
// `news` type). Not consumed by any grassroots-sports route yet — a future
// client that needs a blog gets this collection plus a real listing/detail
// page added together, as one feature, not a schema shape sitting empty.
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
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
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL identifier, e.g. "summer-camp-2027".' } },
    { name: 'publishedAt', type: 'date' },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
  ],
};
