@AGENTS.md

# CMS Architecture (Payload)

This project's CMS is [Payload](https://payloadcms.com), self-hosted inside this same Next.js app — not a separate service. It replaced Sanity in September 2026. This section is also the template for future client repos forked from this one (see "Forking checklist" below).

## Collections and globals

- **`Users`** (`src/collections/Users.ts`) — Payload's built-in auth. `role` is `admin` or `editor`. Admins manage everything including other accounts; editors can update content only.
- **`Media`** (`src/collections/Media.ts`) — uploads, stored via Vercel Blob in production (`@payloadcms/storage-vercel-blob`, see `payload.config.ts`) or local disk in dev without a `BLOB_READ_WRITE_TOKEN`. Every upload requires `alt` text.
- **`Products`** (`src/collections/Products.ts`) — generalized "sellable/bookable offering" collection. For Grass Roots Sports this holds the 4 basketball programs (youth/teen/adult/private). A future client in a different vertical reuses the same shape (price, period, tabbed content sections) for whatever they sell.
- **`Pages`** (`src/collections/Pages.ts`) — generic block-based page builder (Hero/RichText/CTA/ImageGrid blocks under `src/blocks/`). **Scaffolded for the template, not consumed by any route on this site** — every page here is a bespoke hand-coded template under `src/app/(site)/[locale]/`, which is the right call for a small, fully-designed site. A future client that wants client-editable freeform pages starts using this collection directly.
- **`Posts`** (`src/collections/Posts.ts`) — blog/news collection with drafts enabled. **Also scaffolded, not wired to a live route yet.** Add a real `/news` listing+detail page alongside it when a client actually needs a blog — don't let it sit as an empty, confusing content type the way Sanity's old `news`/`galleryPhoto` types did.
- **`Settings`** (`src/globals/Settings.ts`) — sitewide singleton. Grouped into tabs mirroring the site's actual sections (Core/Homepage/About/Contact).

## Conventions to keep across every client repo

1. **Native localization, not suffix pairs.** `payload.config.ts` sets `localization: { locales: [...], defaultLocale: 'en' }`; fields that need translation get `localized: true`. Never invent `fieldEn`/`fieldTh`-style duplicate fields — that was Sanity's pattern here and doesn't generalize to a client with a different language set.
2. **Arrays, not numbered fields.** Repeating content (mission cards, "why us" cards, feature lists) is an `array` field (see `src/fields/cardGroup.ts`), never hardcoded `item1Title`/`item2Title`/`item3Title`. A future client with 5 cards instead of 3 needs zero schema changes.
3. **`/admin` is Payload's, `/ops` is anything else.** Payload's admin UI owns `/admin` (its default, and the convention every client template should expect) via the `(payload)` route group. If a client repo also needs an internal ops dashboard unrelated to CMS content, put it at `/ops` or similar — never `/admin`, which collides with Payload's own route (Next.js will otherwise fail to build with a duplicate-page conflict, or worse, render nested `<html>` trees if you also give it its own root layout — see the route-group note below).
4. **Two independent root layouts.** This app has `src/app/(site)/layout.tsx` (fonts, Clerk, analytics, the site's own `<html>`/`<body>`) and `src/app/(payload)/layout.tsx` (Payload's `RootLayout`, its own `<html>`/`<body>`) as **sibling top-level route groups**, with no shared `layout.tsx` directly in `src/app/`. This is required — Next.js only allows one `<html>`/`<body>` pair per render tree, and Payload's `RootLayout` component always renders its own. If you ever see React errors about nested `<html>`/`<body>` or "mounting a new html component," it means something reintroduced a shared root layout above both groups.
5. **Dedicated Postgres per client's CMS**, separate from any of that client's other operational databases. Here, `PAYLOAD_DATABASE_URI` (Neon, pooled connection string) is a completely different Neon project from `DATABASE_URL` (which only holds the unrelated `registrations`/`contact_messages` tables). Don't point Payload at a database another part of the app already owns.
6. **Storage adapter: Vercel Blob** (`@payloadcms/storage-vercel-blob`) when deploying to Vercel — zero extra third-party account, auto-injected token. Only reach for Supabase Storage or another adapter if the client isn't on Vercel.
7. **Access pattern**: `src/access/isAdmin.ts` (admin-only), `src/access/isStaff.ts` (any logged-in user — the baseline for content collections), `src/access/publishedOnly.ts` (public reads see only published docs; staff see drafts). Reuse these three across every collection rather than writing bespoke access functions per collection.

## Client-specific vs. template-generic (Grass Roots Sports)

When forking this repo for a new client, these are the parts that are specific to *this* client and need replacing — everything else in the schema is meant to carry over as-is:

- `Settings.promptpayNumber` — Thai PromptPay payment field. Not relevant outside Thailand; drop it (and the QR-code generation logic in `RegistrationForm`/`PromptPay` code that reads it) for any other client.
- The `Products.slug` options (`youth`/`teen`/`adult`/`private`) — basketball-academy-specific. Replace with whatever the new client actually sells.
- Every page under `src/app/(site)/[locale]/` — hand-built for this site's exact design. The *pattern* (fetch from Payload via `getPayloadClient()`, fall back to `next-intl` translation keys via a local `cms()` helper when a field is empty) is what should carry over, not the JSX itself.

## Known gaps (pre-existing, not introduced by the Payload migration — don't assume fixed)

- `src/app/api/admin/mark-paid/route.ts` only checks that a Clerk session exists (`auth()` returns a `userId`), not that the user's email is in `ADMIN_EMAILS`. Any authenticated Clerk user can currently hit this endpoint.
- `src/app/(site)/ops/layout.tsx`'s `ADMIN_EMAILS` allowlist check may not default-deny if the env var is unset — verify before relying on it.
- `Settings.promptpayNumber` was seeded with the placeholder `"REPLACE_ME"` during the Sanity migration (Sanity's dataset had no real content at all — see git history around September 2026 for the full story). **Must be replaced with a real PromptPay number in the Payload admin before this drives any real payment QR codes.** `Products.priceAmount` was likewise seeded at `0` for all four programs — no real pricing existed anywhere (not in Sanity, not in the i18n fallback copy it was actually seeded from).
- `payload-types.ts` (Payload's generated TypeScript types) could not be generated via `payload generate:types` in this dev environment — the Payload CLI's tsx-based loader hit a Node 24 compatibility bug unrelated to this app's code (`ERR_REQUIRE_ASYNC_MODULE` loading `richtext-lexical`). Pages currently use manual type annotations (e.g. on `.find()` callbacks) instead of generated types. Try running `npx payload generate:types` again on a different Node version or on Vercel/CI — if it works there, wire the generated file in and remove the manual annotations.

## Forking checklist (new client)

1. New dedicated Neon project for `PAYLOAD_DATABASE_URI` (don't reuse another client's).
2. New Vercel Blob store attached to the new Vercel project.
3. Generate a new `PAYLOAD_SECRET` (`openssl rand -base64 32`), never reuse one across clients.
4. Create the first Payload admin user via `/admin` (see "Client accounts" below).
5. Rewrite `Products` fields for whatever the client actually sells; keep `Pages`/`Posts`/`Media`/`Settings` shapes as-is.
6. Update the "Client-specific vs. template-generic" list above for the new client.

## Client accounts

Per this project's account-handoff convention: build using accounts under the client's own email from the start where practical (Neon, Vercel, etc.) rather than transferring ownership later — sidesteps every platform's inconsistent "transfer" support. For Payload specifically, create one `Users` document per real person (client owner + any staff) directly in the admin UI once the schema is stable; this isn't a migration-script task since it's credential creation, not content.
