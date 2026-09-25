# Service provider agreements checklist

DRAFT 2026-09-26. Not legal advice. Every link and menu path below is from memory and may have changed: check each provider's current site, and ask the lawyer about anything marked [LAWYER].

## Why this matters

The site passes visitors' details (names, emails, phone numbers, messages, and photos of participants) to several companies that store or send them for us. Data protection law, including Thailand's PDPA, expects a written agreement with each such company saying they only handle the data on our behalf and keep it secure. Most providers already include this in their standard terms (usually called a "Data Processing Agreement" or "DPA"). The job is to **confirm it applies to our account and keep a PDF copy in one folder**, so we can show it if anyone asks.

Keep the PDFs in one shared folder, for example Google Drive > "Grass Roots legal > Provider agreements". Save each as `provider-name-DPA-YYYY-MM-DD.pdf`. Only the account owner can accept terms, so each step below is done by a person signed in to that account.

## Checklist

| Provider | What it does for us | What to do | Done by, date |
|---|---|---|---|
| **Google Workspace** (the `team@` mailbox) | Receives a copy of every registration and message | In the Google Admin console: Account > Account settings > Legal and compliance > Data Processing Amendment. Review and accept, then save the PDF. | |
| **Vercel** | Hosts the website, cookie-free analytics, and gallery photo storage | 1) Check the plan first: Vercel > Settings > Billing. The site is on **Hobby**, which Vercel describes as for non-commercial use only [verify current terms], and this site takes sign-ups and payments, so ask whether to move to Pro. 2) The DPA is at vercel.com/legal/dpa. Save the PDF. | |
| **Neon** | The database holding registrations and messages | The DPA is part of Neon's terms. Search "Neon DPA" on neon.com, save the PDF. The Neon organisation is "Grass Roots Sports", so its owner must do this. | |
| **Resend** | Sends the confirmation and notification emails | The DPA is part of Resend's terms. Save the PDF from resend.com/legal. | |
| **Google Analytics** | Counts visits, only for people who accept the cookie banner | In Google Analytics: Admin > Account settings > Data Processing Terms. Review and accept. Also review the data sharing settings and turn off anything not needed (for example advertising features). Save a note of the settings. | |
| **Clerk** | Sign-in for staff only, no visitor data | Optional: save the DPA from clerk.com/legal. | |
| **Squarespace** (domain and DNS) | Holds the domain. No personal data from visitors. | Nothing needed for data agreements. Just make sure MFA and the registrar lock stay on. | |
| **UptimeRobot** | Pings the site every 5 minutes. Holds only the alert email address. | Nothing needed. | |

## Things to settle with the lawyer

- The relationship between Alex (who decides how the data is used) and the developer (who runs the site and has access to the accounts). Should there be a short written agreement covering the developer's handling of the data? [LAWYER]
- Whose accounts should own the services. Today the Vercel project sits in the developer's Vercel team and the Neon project in a "Grass Roots Sports" organisation. Consider moving hosting into an account owned by the business, so the agreements are clearly between the business and the providers. [LAWYER]
- Whether the Privacy Policy list of providers matches this table (it names Vercel, Neon, Resend, Google and Clerk). Keep them in step whenever a provider is added or removed.

## Yearly

When you do the yearly review, check that every row above has a saved PDF and that no new provider has been added without one.
