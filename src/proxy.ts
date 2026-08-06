import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Admin routes — require auth, skip intl
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
