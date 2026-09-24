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
| Sign-ups list (`/ops`) | Registrations and messages, mark as paid | tables `registrations`, `contact_messages` |

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
- There are no Clerk keys locally, so `/ops` and `/dashboard` return 500 locally.
- `curl` shows a misleading 500 on Clerk routes (no dev-browser handshake). Check signed-out redirects in a real browser.
- Many files use CRLF line endings. Multi-line scripted edits can silently mismatch. Re-read after any scripted edit.
- Do not use `window.confirm` in the dashboard (silently dead in some browsers). Use inline Yes/Cancel.
- Payload 3.90.x needs a new database column (`users.reset_password_requested_at`). The upgrade was tried and reverted. Only upgrade with a migration.
- Payload (`/admin`) is legacy: Settings, Products, Pages and Posts are hidden. Users and Media remain (Media feeds the gallery fallback).

## Still open

Owner actions (only the owner can do these):
- Turn on MFA in Clerk and on GitHub, Vercel, Neon, Resend and the domain registrar. Save backup codes off the phone.
- Restrict Clerk sign-ups to the two admin emails.
- Rotate the Vercel Blob token (an old debug route briefly showed a fragment of it).
- Set up an uptime monitor and Vercel error alerts.
- Turn on the registrar lock. Change DMARC from `p=none` to `p=quarantine` once reports look clean.
- Move Clerk to a production instance (the sign-in page says "Development mode").
- Confirm the Neon backup window and practise one restore.
- Have a Thai speaker review the Thai written by Claude (sheet: `thai-review.csv`), then apply corrections to `th.json`.

Not built:
- Editable page titles and descriptions for Google, and the legal pages.
- A limit on how many confirmation emails one address can receive (email relay abuse), and a least-privilege database role.
- A data-retention rule for registrations (Thailand PDPA).
- Google Analytics is live and sets cookies while the privacy policy says no tracking cookies. The policy wording needs to match.
