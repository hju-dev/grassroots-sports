import type { CollectionConfig } from 'payload';
import { isStaff } from '@/access/isStaff';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  access: {
    // Editors can see the user list (needed for Payload's admin UI to function) —
    // but "editors" means logged-in staff, not the public internet. This was
    // previously `() => true`, which made GET /api/users publicly return every
    // admin's email address with zero authentication (found in a security
    // review, since fixed). Only admins can create/change/delete accounts.
    read: isStaff,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        description: 'Admins manage everything, including other accounts. Editors can update site content only.',
      },
    },
  ],
};
