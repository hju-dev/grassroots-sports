'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { assertAdmin } from '@/lib/requireAdmin';

// Permanent deletes for the Sign-ups list. Every action starts with
// assertAdmin(): being signed in is not enough, the caller must be on the
// ADMIN_EMAILS allowlist. Each deletes exactly one row, chosen by its numeric
// id. The log line records the id and who did it, never the person's details.

const idSchema = z.number().int().positive();

export type DeleteResult = { ok: true } | { ok: false; error: string };

export async function deleteRegistration(id: unknown): Promise<DeleteResult> {
  const admin = await assertAdmin();
  const parsed = idSchema.safeParse(id);
  if (!parsed.success) return { ok: false, error: 'That record could not be found.' };

  try {
    const sql = getDb();
    const rows = await sql`DELETE FROM registrations WHERE id = ${parsed.data} RETURNING id`;
    console.info(`[admin] ${admin} deleted registration #${parsed.data} (${rows.length} row)`);
    revalidatePath('/ops');
    return { ok: true };
  } catch (err) {
    console.error('[admin] deleteRegistration failed', err);
    return { ok: false, error: 'Could not delete. Please try again.' };
  }
}

export async function deleteContactMessage(id: unknown): Promise<DeleteResult> {
  const admin = await assertAdmin();
  const parsed = idSchema.safeParse(id);
  if (!parsed.success) return { ok: false, error: 'That record could not be found.' };

  try {
    const sql = getDb();
    const rows = await sql`DELETE FROM contact_messages WHERE id = ${parsed.data} RETURNING id`;
    console.info(`[admin] ${admin} deleted contact message #${parsed.data} (${rows.length} row)`);
    revalidatePath('/ops');
    return { ok: true };
  } catch (err) {
    console.error('[admin] deleteContactMessage failed', err);
    return { ok: false, error: 'Could not delete. Please try again.' };
  }
}
