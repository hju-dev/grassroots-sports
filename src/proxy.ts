import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
// Payload's own admin UI — it manages its own session, so this just needs
// to skip next-intl, not go through Clerk.
const isPayloadAdminRoute = createRouteMatcher(['/admin(.*)']);
const isAdminRoute = createRouteMatcher(['/ops(.*)']);
// Only these routes ever need Clerk. clerkMiddleware() is invoked only for
// requests that match this, so the public marketing/registration site never
// runs it at all — no Clerk session cookie gets set on a visitor who will
// never touch /ops (see the note in src/app/(site)/layout.tsx).
const needsClerk = createRouteMatcher(['/ops(.*)', '/sign-in(.*)', '/sign-up(.*)']);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }
  return NextResponse.next();
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  // Payload admin — skip intl, no Clerk check
  if (isPayloadAdminRoute(req)) {
    return NextResponse.next();
  }

  // Ops dashboard + Clerk auth routes — the only paths that need Clerk
  if (needsClerk(req)) {
    return clerkHandler(req, event);
  }

  // Everything else — run next-intl locale routing, no Clerk involved
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
