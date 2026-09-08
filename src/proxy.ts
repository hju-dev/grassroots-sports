import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
// Payload's own admin UI — it manages its own session, so this just needs
// to skip next-intl, not go through Clerk.
const isPayloadAdminRoute = createRouteMatcher(['/admin(.*)']);
const isAdminRoute = createRouteMatcher(['/ops(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Payload admin — skip intl, no Clerk check
  if (isPayloadAdminRoute(req)) {
    return NextResponse.next();
  }

  // Ops dashboard — require Clerk auth, skip intl
  if (isAdminRoute(req)) {
    await auth.protect();
    return NextResponse.next();
  }

  // Clerk auth routes — skip intl
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  // Everything else — run next-intl locale routing
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
