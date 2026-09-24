import { currentUser } from '@clerk/nextjs/server';
import { isAdminEmail } from '@/lib/adminEmails';

// Returns the admin's verified primary email, or null. Uses the primary
// address and requires Clerk to have verified it, so an unverified secondary
// address on someone else's account can never satisfy the allowlist.
export async function getAdminEmail(): Promise<string | null> {
  const user = await currentUser();
  const primary = user?.primaryEmailAddress;
  const email = primary?.verification?.status === 'verified' ? primary.emailAddress : null;
  return isAdminEmail(email) ? email : null;
}

// For server actions and route handlers: being signed in is not enough, the
// caller must be on the ADMIN_EMAILS allowlist. Throws so the action stops.
export async function assertAdmin(): Promise<string> {
  const email = await getAdminEmail();
  if (!email) throw new Error('Forbidden');
  return email;
}
