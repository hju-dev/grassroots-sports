// CLERK SETUP INSTRUCTIONS
// ========================
// 1. Install: npm install @clerk/nextjs
// 2. Add to Vercel env vars:
//    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
//    CLERK_SECRET_KEY=sk_...
// 3. Uncomment the Clerk block below and delete the next-intl-only block
// 4. Done — /admin will be protected automatically

// ─── next-intl only (active until Clerk is wired up) ───────────────────────
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

// ─── Clerk + next-intl combined (uncomment when Clerk keys are added) ───────
//
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import createIntlMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
//
// const intlMiddleware = createIntlMiddleware(routing);
// const isAdminRoute = createRouteMatcher(['/admin(.*)']);
//
// export default clerkMiddleware(async (auth, req) => {
//   if (isAdminRoute(req)) {
//     await auth.protect();
//   }
//   return intlMiddleware(req);
// });
//
// export const config = {
//   matcher: ['/((?!_next|api|.*\\..*).*)'],
// };
