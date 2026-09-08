import type { Access, FieldAccess } from 'payload';

export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin';

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => user?.role === 'admin';
