// Neon database connection
// TODO: uncomment when DATABASE_URL is added to Vercel env vars

// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from './schema';

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql, { schema });

// Placeholder export so imports don't break before Neon is set up
export const db = null;
