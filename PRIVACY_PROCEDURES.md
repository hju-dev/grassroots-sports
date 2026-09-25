# Privacy procedures (internal): Grass Roots Sports

DRAFT 2026-09-25. Not legal advice and not yet reviewed by a lawyer. Points marked [LAWYER] need confirming.
Owner of the data: Alex Dovey (operator). Day-to-day handling: the developer, until Alex takes over. Privacy contact: team@grassrootssports.org.

## 1. Where personal data lives

| Place | What | Who can see it |
|---|---|---|
| Neon project `grassroots-sports`, branch `production`: table `registrations` | name, email, phone, programme, paid flag, language, consent answers and time | developer, Alex (via `/ops`) |
| Same database: table `contact_messages` | name, email, message, consent | developer, Alex (via `/ops`) |
| Inbox `team@grassrootssports.org` (Google) | a copy of every registration and contact email | whoever has the mailbox |
| Resend (email service) | log of emails sent, with recipient addresses | developer |
| Vercel | server logs (IP addresses), Blob storage for gallery photos (may show participants) | developer |
| Google Analytics | visit data, only for people who accepted the cookie banner | developer |
| Instagram and other social accounts | photos and videos posted | Alex |
| Clerk and the Payload database | staff accounts only (the admins) | developer |

Payments: none stored. PromptPay QR codes are made in the browser.

## 2. A person asks to see, correct, delete or restrict their data, or withdraws consent

Deadline: reply within 30 days (the policy promises this). [LAWYER: confirm the legal deadline.]

1. **Log it.** Write the date received, the type of request and the outcome in a private list. Keep no personal details in the log beyond an initials or a reference number.
2. **Check who is asking.** Reply to the email address we already hold for them, and ask them to confirm the request from it. If someone asks about a child, the parent or guardian who registered must ask. Do not release data to an unverified address.
3. **Find the data.** In Neon (SQL Editor, branch `production`), replace `PERSON@EXAMPLE.COM` with the address in lower case:
   ```sql
   SELECT * FROM registrations     WHERE lower(email) = 'person@example.com';
   SELECT * FROM contact_messages  WHERE lower(email) = 'person@example.com';
   ```
   Also search the `team@` inbox and, if they mention photos, the gallery and social accounts.
4. **Do what they asked.**
   - *Access:* send them a copy of what step 3 found (a simple table in an email, or a PDF).
   - *Correct:* update the row, after you have checked the new details with them.
   - *Delete:* run the deletes below, then delete their emails in `team@`. Neon keeps history only for a few hours, so the deleted rows cannot be restored later. That is intended.
     ```sql
     DELETE FROM registrations    WHERE lower(email) = 'person@example.com';
     DELETE FROM contact_messages WHERE lower(email) = 'person@example.com';
     ```
   - *Photos:* remove the photo from the gallery in the dashboard (Gallery tab, delete) and take it down from social media within 30 days.
   - *Withdraw analytics consent:* nothing to do on our side. They use "Cookie settings" in the footer.
5. **Confirm by email** that it is done, and record the date in the log.

Some data cannot be removed on request (for example copies other people already saved, or records we must keep by law). Say so plainly in the reply. [LAWYER: which records, if any, must be kept.]

## 3. Suspected data breach

Examples: a lost or stolen laptop or phone with access to the accounts; a leaked key or password; someone who should not have access viewing `/ops` or Neon; the database or inbox exposed.

Within the first hours:
1. **Stop it.** Change passwords and rotate the affected keys: Vercel token or env vars (Blob token, database URL), Neon password, Clerk keys, Resend key, Google account password. Sign out other sessions. Remove any access that should not exist.
2. **Write down** what happened, when it was found, what data might be involved and how many people.
3. **Judge the risk.** Could the people affected be harmed (identity, contact details of children, message contents)? If it is unlikely to put anyone at risk, log it and stop. If unsure, treat it as a risk.

If it is likely to put people at risk:
4. **Tell the regulator** (Thailand's Personal Data Protection Committee, PDPC) without delay, and within 72 hours of finding out where possible. [LAWYER: confirm the deadline, the form and where to send it.]
5. **Tell the people affected** in plain language: what happened, what data, what we have done, what they should do, and who to contact. Do this promptly if the risk to them is high.
6. **After:** fix the cause, keep the written record, and update this document.

Who to call: developer first (Henry), then Alex. Keep both phone numbers outside this repository. Money or account fraud: also call the relevant bank or provider.

## 4. Consent records

- New registrations and contact messages store the consent answers and a timestamp (`consent_privacy`, `consent_guardian`, `consent_photos`, `consented_at`). To prove consent, look up the row.
- Rows created before 2026-09-25 have empty consent columns. See the open question in `DRAFT_PRIVACY_AND_CONSENT.md`.
- Photo consent: only publish a participant's photo if `consent_photos` is true for their registration. Older registrations have no answer, so treat them as no.

## 5. Yearly review (a reminder task also runs each 1 September)

1. Run the retention check (`scripts/purge-old-records.mjs`, dry run first). Delete contact messages older than 12 months and registrations more than 2 years after last contact, unless someone is still enrolled or in touch.
2. Check that the privacy policy still matches the vendors and data in use (section 1 above).
3. Check that the lawyer and Thai reviews are finished and the "Last updated" dates are right.
4. Check the request log for anything unanswered.
5. Make sure at least two people can reach the accounts (recovery codes stored off the phone).
