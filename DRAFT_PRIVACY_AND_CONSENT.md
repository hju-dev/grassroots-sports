# STATUS 2026-09-25: DEPLOYED WITHOUT LEGAL OR THAI REVIEW

The owner decided to publish now and review afterwards. The text is live but **unreviewed**. These are outstanding, in priority order:

1. **Lawyer review (Thailand).** Confirm or correct:
   - how an individual operator (Alex Dovey) must be named, and whether a postal address is required;
   - the age below which a guardian's consent is needed under PDPA, and the guardian checkbox wording;
   - the cross-border transfer wording (data goes to Singapore, Japan and the United States);
   - the retention periods (contact messages 12 months, registrations 2 years after creation);
   - photo and video consent for children (opt-in checkbox);
   - whether the cookie banner is required for Google Analytics;
   - the "not liable for injury" wording in Terms section 5 (not changed here).
2. **Thai speaker review** of: the Thai privacy policy, the Thai consent checkboxes and cookie banner (`src/messages/th.json`, keys `consent.*`, `register.consent*`, `contact.consentPrivacy`, `footer.cookieSettings`), and the Thai photography clause added to Terms (section 6).
3. **Yearly retention purge.** `scripts/purge-old-records.mjs` is a dry run by default and needs a real `DATABASE_URL`. The reminder task lists what is due; deleting stays a manual decision. First rows fall due around 2027-08 (contact messages) and 2028-08 (registrations).
4. **Deletion, access and breach procedures** now exist in `PRIVACY_PROCEDURES.md` (draft, unreviewed). A yearly retention reminder runs each 1 September (scheduled task `grassroots-yearly-data-purge-check`, read-only; it only runs while the Claude desktop app is open, and otherwise on next launch).
5. **Existing rows** (collected before this change) have no consent record. Ask the lawyer whether they need re-consent.
6. **Vercel function region** was changed to Singapore on 2026-09-25 and takes effect with this deployment.

### Data already held before consent was recorded (question for the lawyer)

Checked in Neon on 2026-09-25 (counts and dates only):
- **Registrations: 4 rows**, all created 2026-08-06 and 2026-08-07 (programmes: 2 teen, 1 private, 1 adult; none marked paid; all in English). They hold name, email and phone number. They were collected before the consent checkboxes existed, so they have **no consent record**. It is not yet known whether they are real prospective customers or test entries from the launch.
- **Contact messages: 2 rows**, created 2026-08-06 to 2026-08-08. They hold name, email and the message text. Same situation.
- Neither set was collected under the new privacy policy.
- The owner can view both lists in the dashboard at `/ops`, the "Sign-ups list" (registrations and messages, with a button to mark payment).

Questions:
1. Do these six people need to be asked for consent again, or can they be kept until the retention limit (messages 12 months, registrations 2 years) because they contacted us themselves?
2. If they are real people, is a short confirmation email enough, and what should it say?
3. If they are test entries, delete them now (recommended, and it needs the owner or developer to confirm which rows).
4. Should anything be done about the contact copies already in the `team@` inbox?
Other things found in the same database, not personal data but worth cleaning: a table `orders` (1 row) and a table `playing_with_neon` (10 rows) that the website does not use. They look like leftovers and should be checked and removed with the owner's approval.

Internal procedures for requests, breaches and the yearly review are in `PRIVACY_PROCEDURES.md`. Ask the lawyer to review that too (the [LAWYER] points).

When a review changes any wording, update the page, this file and the "Last updated" date together.

---

# DRAFT: privacy policy rewrite and form consent (NOT LIVE)

Status: draft for the owner to review. Nothing here is on the site. Not legal advice: have a Thai lawyer check it, especially the parts marked [LAWYER].
Facts used, from the code and DNS checks on 2026-09-25: forms collect name, email, phone, programme (register) and name, email, message (contact). Data is stored in Neon (Singapore, ap-southeast-1). Email goes through Resend (sending servers in Tokyo, ap-northeast-1). Site is hosted on Vercel [CONFIRM the function region in Vercel, it defaults to the US]. Analytics: Google Analytics 4 and Vercel Analytics. Photos are stored in Vercel Blob. Clerk is used for admin sign-in only.

Decisions made 2026-09-25:
1. Privacy contact: `team@grassrootssports.org`.
2. Operator: Alex Dovey, trading as Grass Roots Sports (an individual, not a company). [LAWYER: confirm how to name the operator and whether a postal address must appear.]
3. Retention: no law sets one fixed number. PDPA only says keep data no longer than needed for the purpose, so the periods in section 5 are my proposal for the lawyer to confirm. The developer runs the yearly deletion until Alex takes over (see section D).
4. GA4 stays, with the consent banner in section C. Thai guidance on analytics cookies is not settled in my knowledge, and a banner is the cautious choice.

---

## A. Privacy Policy (English), replacement text

**Privacy Policy**
Last updated: [date of publishing]

**1. Who we are**
Grass Roots Sports ("we", "us") is a community basketball academy in Pattaya, Thailand, operated by Alex Dovey. We run grassrootssports.org. We decide how the personal data described here is used. Contact for anything about your data: team@grassrootssports.org.

**2. What we collect and why**
- **Registration form:** your name, email address, phone number and the programme you choose. We use it to reply to you, confirm your place, and send programme information and schedule changes. Legal basis: your consent, and taking steps at your request before enrolment.
- **Contact form:** your name, email address and message. We use it only to answer you. Legal basis: your consent.
- **Children:** youth and teen programmes are registered by a parent or guardian. We ask for the adult's details, not the child's. If we later need a child's name, age or medical information, we will ask the parent or guardian separately and explain why. [LAWYER: confirm the age at which a guardian's consent is needed under PDPA.]
- **Photos and video:** with your consent we may photograph sessions for our website and social media. See section 6.
- **Website analytics:** with your consent only (section 7), we use Google Analytics to count visits and see which pages are used. We also use Vercel Analytics, which does not use cookies.
- **Payments:** we do not collect card or bank details. PromptPay QR codes are made in your browser.
- **Technical data:** like all websites, our host receives your IP address and browser details when you load a page. It is used to keep the site running and secure, and to limit abuse of our forms.

**3. Who receives your data**
We do not sell your data or use it for advertising. We use these providers to run the site, and each processes data only for us:
- Vercel (hosting, analytics, photo storage)
- Neon (database, Singapore)
- Resend (sending our emails, servers in Japan)
- Google (analytics, only if you accept analytics cookies)
- Clerk (sign-in for our staff only; visitors are not affected)
We may also share data if the law requires it.

**4. Sending data abroad**
Some of these providers store or process data outside Thailand, including in Singapore, Japan and the United States. We choose providers with security and data-protection commitments, and we only send what each needs. [LAWYER: confirm required wording for cross-border transfers under PDPA.]

**5. How long we keep it**
- Contact messages: 12 months, then deleted.
- Registrations: kept while you are enrolled or in touch with us, and deleted 2 years after your last contact. [LAWYER: confirm both periods. Shorter is safer. If a longer period is needed for tax or insurance records, say so here and why.]
- We review and delete old records once a year.
- If you ask us to delete your data earlier, we do (section 8).

**6. Photos and video of participants**
We only publish a photo or video of you or your child if you have agreed on the registration form. You can withdraw that agreement at any time by emailing us, and we will remove the images from the website and from our social media pages within 30 days. We cannot remove copies others have already saved or shared.

**7. Cookies**
- **Strictly needed:** a language cookie (`NEXT_LOCALE`) that remembers whether you chose English or Thai. It does not identify you.
- **Analytics (only if you accept):** Google Analytics cookies that measure visits. If you decline, we do not load Google Analytics. You can change your choice at any time through the "Cookie settings" link in the footer.
We use no advertising cookies.

**8. Your rights**
Under Thailand's Personal Data Protection Act B.E. 2562 (PDPA) you can ask to see your data, correct it, delete it, restrict or object to its use, receive a copy, and withdraw consent at any time. Email team@grassrootssports.org. We will reply within 30 days. We may need to confirm who you are first. You can also complain to Thailand's Personal Data Protection Committee.

**9. Security and problems**
We use encrypted connections (HTTPS), limit staff access with sign-in, and keep backups. If a data breach is likely to put you at risk, we will tell you and the authorities as the law requires.

**10. Changes**
When we change this policy we change the date at the top. If a change affects how we use your data, we will ask for your consent again where the law requires it.

---

## B. Form changes

### B1. Registration form (`src/components/RegistrationForm.tsx`)
Add above the submit button, both required:

- Checkbox 1 (required): "I have read the [Privacy Policy](/en/privacy) and agree that Grass Roots Sports may use my details to contact me about this registration."
- Checkbox 2 (required, shown only if the programme is youth or teen): "I am the parent or legal guardian of the participant and I agree to this on their behalf."
- Checkbox 3 (optional, unticked by default): "Photos and video of the participant may appear on the Grass Roots Sports website and social media. I agree." Leave it unticked. Photo consent must never be required to register.

Server side (`src/app/api/register/route.ts`): reject the request unless checkbox 1 is true (and 2 when programme is youth or teen). Store the answers and a timestamp so consent can be proved, which needs a database change (new columns `consent_privacy`, `consent_guardian`, `consent_photos`, `consented_at`). That is a schema change, so it needs your approval before it runs.

Thai text [NEEDS Thai speaker review]:
1. ฉันได้อ่าน[นโยบายความเป็นส่วนตัว](/th/privacy)แล้ว และยินยอมให้ Grass Roots Sports ใช้ข้อมูลของฉันเพื่อติดต่อเกี่ยวกับการลงทะเบียนนี้
2. ฉันเป็นผู้ปกครองตามกฎหมายของผู้เข้าร่วม และให้ความยินยอมนี้แทนผู้เข้าร่วม
3. ยินยอมให้เผยแพร่ภาพถ่ายและวิดีโอของผู้เข้าร่วมบนเว็บไซต์และโซเชียลมีเดียของ Grass Roots Sports

### B2. Contact form (`src/components/ContactForm.tsx`)
One required checkbox: "I have read the Privacy Policy and agree that you may use my details to reply to this message." (same server-side check).

### B3. Terms and Conditions, section 6
Change the photo clause from opt-out to opt-in:
"Photos and videos may be taken during sessions. We only publish images of a participant if you agreed on the registration form. You can withdraw that agreement at any time by emailing team@grassrootssports.org."
[LAWYER: also ask about the "not liable for injury" wording in section 5.]

---

## C. Cookie consent (needed because GA4 is loaded now)

- Banner on first visit with two equal buttons: "Accept analytics" and "Decline". Nothing from Google loads until Accept.
- Footer link "Cookie settings" to change the choice.
- Code: load `<GoogleAnalytics>` in `src/app/(site)/layout.tsx` only after consent. The consent choice is stored in a first-party cookie or localStorage.
- The privacy policy section 7 above already describes this. Do not publish the policy text before the banner exists.
- Simpler alternative: remove GA4 and keep only Vercel Analytics (cookieless). Then no banner is needed, and section 7 loses its analytics bullet.

---

## D. Also change
- Replace `akdovey@gmail.com` with `team@grassrootssports.org` on the privacy, terms and accessibility pages (English and Thai).
- Update the handoff: the "privacy policy says no tracking cookies" gap is stale (the policy already mentions GA). The real gap is consent before GA loads.
- Add a one-page breach plan and a deletion-request procedure as a separate internal document (who, steps, 30 days).
- Yearly deletion job, run by the developer until Alex takes over: delete `contact_messages` older than 12 months and `registrations` with no contact for 2 years. Log what was deleted. This can be a script run by hand once a year, or a scheduled job. Writing it needs your approval, because it deletes data.

## E. Order of work
1. Done: the four decisions at the top.
2. Lawyer reviews sections A, B and the [LAWYER] points.
3. Build and test locally, then deploy the policy, forms, banner and database change together, so the policy never describes things that don't exist yet.
