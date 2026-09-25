# Yearly data retention check

This describes an automatic yearly reminder (a "scheduled task" called `grassroots-yearly-data-purge-check`) and the script it points to. The reminder itself lives on the developer's computer, not on the website, so this page is its written record.

## Why it exists

The Privacy Policy tells visitors how long we keep their details:

- **Contact messages:** deleted 12 months after they were sent.
- **Registrations:** deleted 2 years after the person's last contact.

Nothing deletes data by itself, so someone has to check once a year and remove what is past its limit. This reminder makes sure that happens.

## What happens each 1 September

1. At 9:00 on 1 September the developer's Claude app runs the reminder. It only runs while the app is open, and otherwise on the next launch.
2. It looks at the database **read-only** and reports: how many contact messages are older than 12 months, how many registrations are older than 2 years, and which ones (ids and dates only, never names or emails).
3. It reminds the developer what to do next. **It never deletes anything.**

The first records fall due around **August 2027** (contact messages) and **August 2028** (registrations).

## What to do when the report says something is due

1. **Check who is still active.** Anyone still enrolled or still in touch should be kept. Their registration date is old, but the policy counts from the last contact.
2. **Export first.** The database keeps only a few hours of history, so a deletion cannot be undone later. Download the two tables as CSV from the Neon SQL Editor and keep the files somewhere safe.
3. **Delete.** Either:
   - use the Delete button next to each record in the **Sign-ups list** in this dashboard (one record at a time, with a confirmation), or
   - ask the developer to run the purge script, which first shows a dry run of what it would delete and only deletes when told to.
4. **Remove email copies.** Delete the matching emails from the `team@grassrootssports.org` inbox, because every registration and message also arrives there.
5. **Note it** in the request log described in the Privacy procedures.

## Also review once a year

- The Privacy Policy still matches the services and data actually used.
- The lawyer and Thai-language reviews listed in the Privacy and consent draft are finished.
- At least two people can get into the important accounts (recovery codes stored off the phone).

## Where things are

- Script: `scripts/purge-old-records.mjs` in the website code (dry run by default).
- Reminder: scheduled task `grassroots-yearly-data-purge-check`, created 2026-09-25 by the developer.
- Related documents in this dashboard: *Privacy procedures* and *Privacy and consent draft*.
