# Grass Roots Sports: owner dashboard (CMS) handoff

Written 2026-09-24. Everything below is live on production unless it says otherwise.

## What the owner can do

Sign in at `/dashboard` (Clerk). Only emails in the `ADMIN_EMAILS` Vercel variable get in, and only with a verified primary email.

| Tab | What it edits | Stored in |
|---|---|---|
| Gallery | Photos: upload, describe (EN/TH), group, reorder, publish, delete | table `gallery_photos` |
| Text & links | 309 messages in English and Thai, the Instagram link, the announcement bar | table `site_content` |
| Images | 7 named images (logo, share picture, home and About photos) | table `image_slots` |
| Schedule | The weekly grid of programs and times | table `site_settings` (key `schedule`) |
| Form on/off | Switches the Register Interest form off and on | table `site_settings` (key `registrations_open`) |
| Sign-ups list (`/ops`) | Registrations and messages, mark as paid, permanently delete one record at a time (inline Yes/Cancel, server action `src/app/(site)/ops/actions.ts`) | tables `registrations`, `contact_messages` |
| Documents (`/dashboard/documents`) | Internal read-only notes: privacy procedures, yearly data check, privacy and consent draft. Files live in `internal-docs/`; the list and the plain-language descriptions are in `src/lib/internal-docs.ts` | markdown files in the repo |

Every editor has a numbered how-to strip. Nothing goes live until Publish or Save. Every editor can go back to the original.

## How it works

- **Built-in text is the fallback.** `src/messages/en.json` and `th.json` hold every default. `src/lib/content-defs.ts` only lists which messages are editable and how they are labelled. Published edits are laid over the messages in `src/i18n/request.ts` by `src/lib/content-overlay.ts`. An edit equal to the original is stored as no override.
- **Every read falls back.** If a table is missing or the database is down, pages show built-in text, bundled images, the planned schedule, and an open form. Public pages never break.
- **Every server action starts with `assertAdmin()`** (`src/lib/requireAdmin.ts`). Being signed in is not enough. Every dashboard page also re-checks, because layouts are not a security boundary.
- **Validation is in code, not the browser:** `content-defs.ts` (text and links), `gallery-validate.ts`, `schedule-validate.ts`. Text may not contain `{ } < >` (the translation system reads them as code) and links must be `https://`. The overlay re-validates on read.
- **Images:** the browser shrinks big photos first, the server re-encodes to WebP with sharp (resized, metadata removed) and stores in Vercel Blob. Vercel rejects request bodies over 4.5 MB.
- **Security headers** are in `next.config.ts`. The Content-Security-Policy is enforced on `/en` and `/th` pages only; the dashboard, sign-in and CMS admin are report-only because they load Clerk and Payload and could not be tested signed in.

## Recipes

- **Make another message editable:** add the text to both message files, use `t('key')` in the page, then add one line to `CONTENT_FIELDS` in `content-defs.ts`. Run the "every default passes its own validation" check (see Tests).
- **Add an image slot:** add an entry to `IMAGE_SLOTS` (with the bundled file's real width and height) in `src/lib/image-slot-defs.ts`, then use `getSlotImages()` where the image is shown.
- **Add a table:** add it to `src/lib/schema.sql`, get approval, run it, then read it through a function that returns defaults on error.
- **Deploy:** push to `main`; Vercel builds automatically. Verify with `curl` against the live site.

## Tests worth re-running after changes

The validators were tested with hostile input (prototype keys, SQL, braces, wrong types, over-length, bad links). Re-check that every built-in default passes its own validation unchanged, otherwise Publish on an untouched tab fails. Compare the visible text of every page between production and a local build before deploying content-layer changes.

## Gotchas

- Local `.env.local` points at the **production** Payload database. Local dev reads and writes live data.
- There are no working Clerk keys locally, so `/ops` and `/dashboard` return 500 locally. Vercel will not export Sensitive values (Clerk secret, Blob token, database URL, Resend key): `vercel env pull` writes `[SENSITIVE]` placeholders. Local `.env.local` needs real values pasted in by hand for those.
- `curl` shows a misleading 500 on Clerk routes (no dev-browser handshake). Check signed-out redirects in a real browser.
- Many files use CRLF line endings. Multi-line scripted edits can silently mismatch. Re-read after any scripted edit.
- Do not use `window.confirm` in the dashboard (silently dead in some browsers). Use inline Yes/Cancel.
- Payload 3.90.x needs a new database column (`users.reset_password_requested_at`). The upgrade was tried and reverted. Only upgrade with a migration.
- Payload (`/admin`) is legacy: Settings, Products, Pages and Posts are hidden. Users and Media remain (Media feeds the gallery fallback).

## Done 2026-09-25

- Vercel Blob token rotated and tested with a live upload.
- Uptime monitors (UptimeRobot) on `/en` and `/th`, plus Vercel deployment and error alerts.
- Registrar lock turned on at Squarespace Domains.
- SPF record added on the root domain (`v=spf1 include:_spf.google.com ~all`). Before this the root had none. Resend mail uses `send.` (own SPF) and `resend._domainkey`.
- Clerk moved to a **production instance** (`pk_live_` and `sk_live_` set for Production only in Vercel; Preview and Development keep test keys). Its DNS records (`clerk`, `accounts`, `clkmail`, `clk._domainkey`, `clk2._domainkey`) are CNAMEs at Squarespace. Google sign-in was removed, so sign-in is by email code. Sign-ups are **invite only**. New admins must be invited in Clerk and listed in `ADMIN_EMAILS`.
- Neon restore practised: a branch from one hour back, row counts checked, branch deleted. **History retention is 6 hours** (21600 seconds, checked through the Neon API on 2026-09-25; it had been reported as one day), so anything older than 6 hours cannot be restored from Neon. The Neon free plan may cap this, so check the plan.

## Still open

Owner actions (only the owner can do these):
- Change DMARC from `p=none` to `p=quarantine`. First send a test from the `team@` mailbox to a personal Gmail and check SPF, DKIM and DMARC all show PASS (Show original), and check a website confirmation email the same way. The record has no `rua=` report address yet. DNS checked 2026-09-25: SPF, Google DKIM, Resend DKIM and Clerk DKIM records are all present, so only the live test is missing. Waiting on the client (unreachable). Once it passes, set TXT `_dmarc` at Squarespace to `v=DMARC1; p=quarantine; pct=25; rua=mailto:team@grassrootssports.org`, then raise `pct` to 100 after a couple of weeks of clean reports.
- Confirm and save the data processing agreement of each service provider (Google Workspace, Vercel, Neon, Resend, Google Analytics), and decide about Vercel's Hobby plan (non-commercial use; verify current terms). Checklist: `internal-docs/SERVICE_PROVIDER_AGREEMENTS.md`, also shown in the dashboard Documents section.
- Turn on MFA on Clerk, GitHub, Vercel, Neon, Resend and the registrar. Save backup codes off the phone.
- Raise Neon history retention above 6 hours if the plan allows it, or take regular exports of `registrations` and `contact_messages`.
- Have a Thai speaker review the Thai written by Claude (sheet: `thai-review.csv`), then apply corrections to `th.json`.

Privacy and consent work: DEPLOYED 2026-09-25 (commit 373bddb) without legal or Thai review. The schema change was applied first, and the Vercel function region was changed to Singapore. Verified live: banner shows before any cookie, Google Analytics loads only after Accept, both forms reject requests without consent (HTTP 400). Outstanding reviews and follow-ups are listed at the top of `internal-docs/DRAFT_PRIVACY_AND_CONSENT.md`:
- Lawyer review of the policy, consent wording, retention periods and the cookie-banner requirement.
- Thai speaker review of the Thai policy, checkboxes, banner and Terms photo clause.
- Schedule the yearly purge (`scripts/purge-old-records.mjs`, dry run by default) and write the deletion, access and breach procedures.
- Decide whether registrations collected before the consent flow need re-consent.

Not built:
- Editable page titles and descriptions for Google, and the legal pages.
- A limit on how many confirmation emails one address can receive (email relay abuse), and a least-privilege database role.
