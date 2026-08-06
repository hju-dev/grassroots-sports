// SANITY SETUP INSTRUCTIONS
// =========================
// 1. Install: npm install @sanity/client next-sanity
// 2. Add to Vercel env vars:
//    NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345   (from sanity.io project settings)
//    NEXT_PUBLIC_SANITY_DATASET=production
// 3. Uncomment the client export below (delete the placeholder)
// 4. Done — use the exported client in server components to fetch content

// ─── Placeholder (active until Sanity project ID is provided) ───────────────
export const sanityClient = null;

// ─── Real client (uncomment when env vars are set) ─────────────────────────
//
// import { createClient } from '@sanity/client';
//
// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
//   apiVersion: '2025-08-06',
//   useCdn: true,
// });
