// The internal documents shown in the owner dashboard (/dashboard/documents).
// The files live in /internal-docs at the repository root. The slug is the
// only thing that ever reaches the URL, and it maps to a fixed file name here,
// so a request can never name an arbitrary file.

export type InternalDoc = {
  slug: string;
  title: string;
  file: string;
  /** Plain-language summary shown on the documents list and above the document. */
  whatItIs: string;
  usedFor: string;
  whoUsesIt: string;
  status: string;
};

export const INTERNAL_DOCS: InternalDoc[] = [
  {
    slug: 'privacy-procedures',
    title: 'Privacy procedures',
    file: 'PRIVACY_PROCEDURES.md',
    whatItIs:
      'A step-by-step guide to handling personal data: where the website keeps it, what to do when someone asks to see, correct or delete their details, and what to do if data is lost or stolen.',
    usedFor:
      'Open this whenever a person emails to ask about their data, whenever you suspect a security problem, and once a year for the review checklist at the end.',
    whoUsesIt: 'Alex and the developer.',
    status: 'Draft. A lawyer has not reviewed it yet.',
  },
  {
    slug: 'yearly-data-purge-check',
    title: 'Yearly data retention check',
    file: 'YEARLY_DATA_PURGE_CHECK.md',
    whatItIs:
      'A description of the automatic yearly reminder that checks which sign-ups and messages have been kept longer than the Privacy Policy allows. It explains what the reminder does and what to do when it reports something.',
    usedFor:
      'Read this when the reminder arrives each 1 September, to know how to decide what to delete and how to delete it safely. The Delete buttons in the Sign-ups list are the tool for this.',
    whoUsesIt: 'The developer runs the reminder. Alex decides who is still in touch and can be kept.',
    status: 'Active. The first records fall due around August 2027.',
  },
  {
    slug: 'service-provider-agreements',
    title: 'Service provider agreements',
    file: 'SERVICE_PROVIDER_AGREEMENTS.md',
    whatItIs:
      'A checklist of the companies that store or send the personal details of visitors for us (email, hosting, database, analytics), and the data agreement each one needs. Data protection law expects a written agreement with each.',
    usedFor:
      'Work down the table: sign in to each account, accept or download its data agreement, and save the PDF in one folder. It also lists questions to put to the lawyer, including a hosting plan that may not allow commercial use.',
    whoUsesIt: 'Alex (for accounts he owns) and the developer.',
    status: 'Not started. Nothing on the list has been confirmed yet.',
  },
  {
    slug: 'privacy-and-consent-draft',
    title: 'Privacy and consent draft',
    file: 'DRAFT_PRIVACY_AND_CONSENT.md',
    whatItIs:
      'The reasoning and wording behind the Privacy Policy, the cookie banner and the consent tick-boxes on the forms, plus the list of things still to be checked by a lawyer and by a Thai speaker.',
    usedFor:
      'Send it to the lawyer and the Thai reviewer so they know exactly what to check. It also records what has been decided and what is still open.',
    whoUsesIt: 'Alex, the developer, the lawyer and the Thai reviewer.',
    status: 'The policy is live but has not been legally reviewed. The open items are listed at the top.',
  },
];

export function getInternalDoc(slug: string): InternalDoc | undefined {
  return INTERNAL_DOCS.find((d) => d.slug === slug);
}
