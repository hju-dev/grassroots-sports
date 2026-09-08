import type { Access } from 'payload';

// Any logged-in Payload user (admin or editor) — the baseline for content
// collections/globals: staff can read and update content, but Users-collection
// management and schema-level settings stay admin-only (see isAdmin.ts).
export const isStaff: Access = ({ req: { user } }) => Boolean(user);
