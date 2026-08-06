import { neon } from '@neondatabase/serverless';

// Returns a query function connected to Neon — called at request time, not module load
export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}
