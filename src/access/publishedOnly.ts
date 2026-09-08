import type { Access } from 'payload';

// Public/logged-out requests only ever see published documents; staff (any
// logged-in user) see everything, including drafts, when editing.
export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true;
  return { published: { equals: true } };
};
