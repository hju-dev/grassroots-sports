// Editable site text and links. Plain data and small helpers with no server
// imports, so the dashboard's client editor and the server can both use it.
//
// The built-in wording is NOT copied here: it lives in src/messages/en.json and
// th.json, which stay the source of truth and the fallback everywhere. This
// file only says which of those messages the owner can edit, and how each one
// is labelled in the dashboard. Payment details and legal pages are left out
// on purpose.

import en from '@/messages/en.json';
import th from '@/messages/th.json';

export type ContentPage =
  | 'Home' | 'About' | 'Programs' | 'Program pages' | 'Contact'
  | 'Register' | 'Gallery' | 'Schedule' | 'Partners' | 'Menus & footer';

export const CONTENT_PAGES: ContentPage[] = [
  'Home', 'About', 'Programs', 'Program pages', 'Contact',
  'Register', 'Gallery', 'Schedule', 'Partners', 'Menus & footer',
];

export type ContentField = {
  // Message path, for example "home.headline". Stored as "en.home.headline" and "th.home.headline".
  key: string;
  page: ContentPage;
  group: string;
  label: string;
  long: boolean;
  hint?: string;
};

// Generated once from the message files; edit labels by hand from here on.
export const CONTENT_FIELDS: ContentField[] = [
  { key: 'home.headline', page: 'Home', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'home.subheadline', page: 'Home', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'home.cta', page: 'Home', group: 'Top of the page', label: 'Main button text', long: false },
  { key: 'home.missionTitle', page: 'Home', group: 'What we stand for', label: 'Section title', long: false },
  { key: 'home.mission1Title', page: 'Home', group: 'What we stand for', label: 'Card 1 title', long: false },
  { key: 'home.mission1Desc', page: 'Home', group: 'What we stand for', label: 'Card 1 text', long: false },
  { key: 'home.mission2Title', page: 'Home', group: 'What we stand for', label: 'Card 2 title', long: false },
  { key: 'home.mission2Desc', page: 'Home', group: 'What we stand for', label: 'Card 2 text', long: false },
  { key: 'home.mission3Title', page: 'Home', group: 'What we stand for', label: 'Card 3 title', long: false },
  { key: 'home.mission3Desc', page: 'Home', group: 'What we stand for', label: 'Card 3 text', long: false },
  { key: 'home.programsTitle', page: 'Home', group: 'Our Programs section', label: 'Section title', long: false },
  { key: 'home.programsSubtitle', page: 'Home', group: 'Our Programs section', label: 'Intro text', long: false },
  { key: 'home.programsCta', page: 'Home', group: 'Our Programs section', label: 'View All Programs button', long: false },
  { key: 'home.involvedTitle', page: 'Home', group: 'Get Involved', label: 'Section title', long: false },
  { key: 'home.involvedSubtitle', page: 'Home', group: 'Get Involved', label: 'Intro text', long: true },
  { key: 'home.involvedPlayTitle', page: 'Home', group: 'Get Involved: Play', label: 'Title', long: false },
  { key: 'home.involvedPlayDesc', page: 'Home', group: 'Get Involved: Play', label: 'Text', long: false },
  { key: 'home.involvedPlayCta', page: 'Home', group: 'Get Involved: Play', label: 'Link text', long: false },
  { key: 'home.involvedPartnerTitle', page: 'Home', group: 'Get Involved: Partner', label: 'Title', long: false },
  { key: 'home.involvedPartnerDesc', page: 'Home', group: 'Get Involved: Partner', label: 'Text', long: false },
  { key: 'home.involvedPartnerCta', page: 'Home', group: 'Get Involved: Partner', label: 'Link text', long: false },
  { key: 'home.involvedInvestTitle', page: 'Home', group: 'Get Involved: Invest', label: 'Title', long: false },
  { key: 'home.involvedInvestDesc', page: 'Home', group: 'Get Involved: Invest', label: 'Text', long: false },
  { key: 'home.involvedInvestCta', page: 'Home', group: 'Get Involved: Invest', label: 'Link text', long: false },
  { key: 'home.involvedTeamTitle', page: 'Home', group: 'Get Involved: Join the Team', label: 'Title', long: false },
  { key: 'home.involvedTeamDesc', page: 'Home', group: 'Get Involved: Join the Team', label: 'Text', long: false },
  { key: 'home.involvedTeamCta', page: 'Home', group: 'Get Involved: Join the Team', label: 'Link text', long: false },
  { key: 'home.instagramTitle', page: 'Home', group: 'Instagram section', label: 'Title', long: false },
  { key: 'home.instagramSubtitle', page: 'Home', group: 'Instagram section', label: 'Text', long: false },
  { key: 'home.instagramCta', page: 'Home', group: 'Instagram section', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'about.headline', page: 'About', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'about.subtitle', page: 'About', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'about.whyTitle', page: 'About', group: 'Why Grass Roots?', label: 'Section title', long: false },
  { key: 'about.why1Title', page: 'About', group: 'Why Grass Roots?', label: 'Point 1 title', long: false },
  { key: 'about.why1Desc', page: 'About', group: 'Why Grass Roots?', label: 'Point 1 text', long: true },
  { key: 'about.why2Title', page: 'About', group: 'Why Grass Roots?', label: 'Point 2 title', long: false },
  { key: 'about.why2Desc', page: 'About', group: 'Why Grass Roots?', label: 'Point 2 text', long: true },
  { key: 'about.why3Title', page: 'About', group: 'Why Grass Roots?', label: 'Point 3 title', long: false },
  { key: 'about.why3Desc', page: 'About', group: 'Why Grass Roots?', label: 'Point 3 text', long: true },
  { key: 'about.comingTitle', page: 'About', group: 'Coming to Pattaya section', label: 'Title', long: false },
  { key: 'about.comingDesc', page: 'About', group: 'Coming to Pattaya section', label: 'Text', long: true },
  { key: 'about.instagramCta', page: 'About', group: 'Instagram button', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'about.storyLabel', page: 'About', group: 'Our Story', label: 'Small label above the story', long: false },
  { key: 'about.story1', page: 'About', group: 'Our Story', label: 'Opening line (large text)', long: true },
  { key: 'about.story2', page: 'About', group: 'Our Story', label: 'Paragraph before the photo', long: true },
  { key: 'about.story3', page: 'About', group: 'Our Story', label: 'Highlighted line after the photo', long: false },
  { key: 'about.story4', page: 'About', group: 'Our Story', label: 'Vision paragraph', long: true },
  { key: 'about.story5', page: 'About', group: 'Our Story', label: 'Looking-ahead paragraph', long: true },
  { key: 'about.story6', page: 'About', group: 'Our Story', label: 'Team paragraph', long: true },
  { key: 'programs.headline', page: 'Programs', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'programs.subtitle', page: 'Programs', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'programs.comingSoon', page: 'Programs', group: 'Program cards', label: 'Coming Soon badge', long: false },
  { key: 'programs.youthTitle', page: 'Programs', group: 'Youth Basketball card', label: 'Card title', long: false },
  { key: 'programs.youthAges', page: 'Programs', group: 'Youth Basketball card', label: 'Age group label', long: false },
  { key: 'programs.youthDesc', page: 'Programs', group: 'Youth Basketball card', label: 'Card text', long: true },
  { key: 'programs.teenTitle', page: 'Programs', group: 'Teen Academy card', label: 'Card title', long: false },
  { key: 'programs.teenAges', page: 'Programs', group: 'Teen Academy card', label: 'Age group label', long: false },
  { key: 'programs.teenDesc', page: 'Programs', group: 'Teen Academy card', label: 'Card text', long: true },
  { key: 'programs.adultTitle', page: 'Programs', group: 'Adult Leagues card', label: 'Card title', long: false },
  { key: 'programs.adultAges', page: 'Programs', group: 'Adult Leagues card', label: 'Age group label', long: false },
  { key: 'programs.adultDesc', page: 'Programs', group: 'Adult Leagues card', label: 'Card text', long: true },
  { key: 'programs.privateTitle', page: 'Programs', group: 'Private Coaching card', label: 'Card title', long: false },
  { key: 'programs.privateAges', page: 'Programs', group: 'Private Coaching card', label: 'Age group label', long: false },
  { key: 'programs.privateDesc', page: 'Programs', group: 'Private Coaching card', label: 'Card text', long: true },
  { key: 'programs.learnMore', page: 'Programs', group: 'Program cards', label: 'Learn More button', long: false },
  { key: 'programs.registerCta', page: 'Programs', group: 'Get notified section', label: 'Register Interest button', long: false },
  { key: 'programs.notifyTitle', page: 'Programs', group: 'Get notified section', label: 'Title', long: false },
  { key: 'programs.notifyDesc', page: 'Programs', group: 'Get notified section', label: 'Text', long: true },
  { key: 'programs.notifyCta', page: 'Programs', group: 'Get notified section', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'programs.faqTitle', page: 'Programs', group: 'Frequently asked questions', label: 'Section title', long: false },
  { key: 'programs.faq1Q', page: 'Programs', group: 'Frequently asked questions', label: 'Question 1 (the question)', long: false },
  { key: 'programs.faq1A', page: 'Programs', group: 'Frequently asked questions', label: 'Question 1 (the answer)', long: true },
  { key: 'programs.faq2Q', page: 'Programs', group: 'Frequently asked questions', label: 'Question 2 (the question)', long: false },
  { key: 'programs.faq2A', page: 'Programs', group: 'Frequently asked questions', label: 'Question 2 (the answer)', long: true },
  { key: 'programs.faq3Q', page: 'Programs', group: 'Frequently asked questions', label: 'Question 3 (the question)', long: false },
  { key: 'programs.faq3A', page: 'Programs', group: 'Frequently asked questions', label: 'Question 3 (the answer)', long: true },
  { key: 'programs.faq4Q', page: 'Programs', group: 'Frequently asked questions', label: 'Question 4 (the question)', long: false },
  { key: 'programs.faq4A', page: 'Programs', group: 'Frequently asked questions', label: 'Question 4 (the answer)', long: true },
  { key: 'programDetail.backBtn', page: 'Program pages', group: 'All program pages', label: 'Back link text', long: false },
  { key: 'programDetail.youth.hero', page: 'Program pages', group: 'Youth Basketball: Top of the page', label: 'Main headline', long: false },
  { key: 'programDetail.youth.tagline', page: 'Program pages', group: 'Youth Basketball: Top of the page', label: 'Short line under the headline', long: false },
  { key: 'programDetail.youth.ages', page: 'Program pages', group: 'Youth Basketball: Top of the page', label: 'Age group label', long: false },
  { key: 'programDetail.youth.overview', page: 'Program pages', group: 'Youth Basketball: Top of the page', label: 'Overview paragraph', long: true },
  { key: 'programDetail.youth.philosophyLabel', page: 'Program pages', group: 'Youth Basketball: Philosophy quote', label: 'Small label above the quote', long: false },
  { key: 'programDetail.youth.philosophy', page: 'Program pages', group: 'Youth Basketball: Philosophy quote', label: 'The quote', long: true },
  { key: 'programDetail.youth.learnTitle', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Section title', long: false },
  { key: 'programDetail.youth.learn1Title', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 1 title', long: false },
  { key: 'programDetail.youth.learn1Desc', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 1 text', long: true },
  { key: 'programDetail.youth.learn2Title', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 2 title', long: false },
  { key: 'programDetail.youth.learn2Desc', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 2 text', long: true },
  { key: 'programDetail.youth.learn3Title', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 3 title', long: false },
  { key: 'programDetail.youth.learn3Desc', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 3 text', long: true },
  { key: 'programDetail.youth.learn4Title', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 4 title', long: false },
  { key: 'programDetail.youth.learn4Desc', page: 'Program pages', group: 'Youth Basketball: What they will learn', label: 'Card 4 text', long: true },
  { key: 'programDetail.youth.formatTitle', page: 'Program pages', group: 'Youth Basketball: Format', label: 'Section title', long: false },
  { key: 'programDetail.youth.formatDesc', page: 'Program pages', group: 'Youth Basketball: Format', label: 'Description', long: true },
  { key: 'programDetail.youth.forTitle', page: 'Program pages', group: 'Youth Basketball: Who it is for', label: 'Section title', long: false },
  { key: 'programDetail.youth.forDesc', page: 'Program pages', group: 'Youth Basketball: Who it is for', label: 'Description', long: true },
  { key: 'programDetail.youth.pathwayLabel', page: 'Program pages', group: 'Youth Basketball: Pathway banner', label: 'Small label (leave empty to hide the banner)', long: false },
  { key: 'programDetail.youth.pathway', page: 'Program pages', group: 'Youth Basketball: Pathway banner', label: 'Banner text (leave empty to hide the banner)', long: true },
  { key: 'programDetail.youth.ctaTitle', page: 'Program pages', group: 'Youth Basketball: Bottom call to action', label: 'Title', long: false },
  { key: 'programDetail.youth.ctaDesc', page: 'Program pages', group: 'Youth Basketball: Bottom call to action', label: 'Text', long: true },
  { key: 'programDetail.youth.cta', page: 'Program pages', group: 'Youth Basketball: Bottom call to action', label: 'Button text', long: false },
  { key: 'programDetail.teen.hero', page: 'Program pages', group: 'Teen Academy: Top of the page', label: 'Main headline', long: false },
  { key: 'programDetail.teen.tagline', page: 'Program pages', group: 'Teen Academy: Top of the page', label: 'Short line under the headline', long: false },
  { key: 'programDetail.teen.ages', page: 'Program pages', group: 'Teen Academy: Top of the page', label: 'Age group label', long: false },
  { key: 'programDetail.teen.overview', page: 'Program pages', group: 'Teen Academy: Top of the page', label: 'Overview paragraph', long: true },
  { key: 'programDetail.teen.philosophyLabel', page: 'Program pages', group: 'Teen Academy: Philosophy quote', label: 'Small label above the quote', long: false },
  { key: 'programDetail.teen.philosophy', page: 'Program pages', group: 'Teen Academy: Philosophy quote', label: 'The quote', long: true },
  { key: 'programDetail.teen.learnTitle', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Section title', long: false },
  { key: 'programDetail.teen.learn1Title', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 1 title', long: false },
  { key: 'programDetail.teen.learn1Desc', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 1 text', long: true },
  { key: 'programDetail.teen.learn2Title', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 2 title', long: false },
  { key: 'programDetail.teen.learn2Desc', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 2 text', long: true },
  { key: 'programDetail.teen.learn3Title', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 3 title', long: false },
  { key: 'programDetail.teen.learn3Desc', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 3 text', long: true },
  { key: 'programDetail.teen.learn4Title', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 4 title', long: false },
  { key: 'programDetail.teen.learn4Desc', page: 'Program pages', group: 'Teen Academy: What they will learn', label: 'Card 4 text', long: true },
  { key: 'programDetail.teen.formatTitle', page: 'Program pages', group: 'Teen Academy: Format', label: 'Section title', long: false },
  { key: 'programDetail.teen.formatDesc', page: 'Program pages', group: 'Teen Academy: Format', label: 'Description', long: true },
  { key: 'programDetail.teen.forTitle', page: 'Program pages', group: 'Teen Academy: Who it is for', label: 'Section title', long: false },
  { key: 'programDetail.teen.forDesc', page: 'Program pages', group: 'Teen Academy: Who it is for', label: 'Description', long: true },
  { key: 'programDetail.teen.pathwayLabel', page: 'Program pages', group: 'Teen Academy: Pathway banner', label: 'Small label (leave empty to hide the banner)', long: false },
  { key: 'programDetail.teen.pathway', page: 'Program pages', group: 'Teen Academy: Pathway banner', label: 'Banner text (leave empty to hide the banner)', long: true },
  { key: 'programDetail.teen.ctaTitle', page: 'Program pages', group: 'Teen Academy: Bottom call to action', label: 'Title', long: false },
  { key: 'programDetail.teen.ctaDesc', page: 'Program pages', group: 'Teen Academy: Bottom call to action', label: 'Text', long: false },
  { key: 'programDetail.teen.cta', page: 'Program pages', group: 'Teen Academy: Bottom call to action', label: 'Button text', long: false },
  { key: 'programDetail.adult.hero', page: 'Program pages', group: 'Adult Leagues: Top of the page', label: 'Main headline', long: false },
  { key: 'programDetail.adult.tagline', page: 'Program pages', group: 'Adult Leagues: Top of the page', label: 'Short line under the headline', long: false },
  { key: 'programDetail.adult.ages', page: 'Program pages', group: 'Adult Leagues: Top of the page', label: 'Age group label', long: false },
  { key: 'programDetail.adult.overview', page: 'Program pages', group: 'Adult Leagues: Top of the page', label: 'Overview paragraph', long: true },
  { key: 'programDetail.adult.philosophyLabel', page: 'Program pages', group: 'Adult Leagues: Philosophy quote', label: 'Small label above the quote', long: false },
  { key: 'programDetail.adult.philosophy', page: 'Program pages', group: 'Adult Leagues: Philosophy quote', label: 'The quote', long: true },
  { key: 'programDetail.adult.learnTitle', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Section title', long: false },
  { key: 'programDetail.adult.learn1Title', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 1 title', long: false },
  { key: 'programDetail.adult.learn1Desc', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 1 text', long: true },
  { key: 'programDetail.adult.learn2Title', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 2 title', long: false },
  { key: 'programDetail.adult.learn2Desc', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 2 text', long: true },
  { key: 'programDetail.adult.learn3Title', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 3 title', long: false },
  { key: 'programDetail.adult.learn3Desc', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 3 text', long: true },
  { key: 'programDetail.adult.learn4Title', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 4 title', long: false },
  { key: 'programDetail.adult.learn4Desc', page: 'Program pages', group: 'Adult Leagues: What they will learn', label: 'Card 4 text', long: true },
  { key: 'programDetail.adult.formatTitle', page: 'Program pages', group: 'Adult Leagues: Format', label: 'Section title', long: false },
  { key: 'programDetail.adult.formatDesc', page: 'Program pages', group: 'Adult Leagues: Format', label: 'Description', long: true },
  { key: 'programDetail.adult.forTitle', page: 'Program pages', group: 'Adult Leagues: Who it is for', label: 'Section title', long: false },
  { key: 'programDetail.adult.forDesc', page: 'Program pages', group: 'Adult Leagues: Who it is for', label: 'Description', long: true },
  { key: 'programDetail.adult.pathwayLabel', page: 'Program pages', group: 'Adult Leagues: Pathway banner', label: 'Small label (leave empty to hide the banner)', long: false, hint: 'Leave empty to hide this part of the page.' },
  { key: 'programDetail.adult.pathway', page: 'Program pages', group: 'Adult Leagues: Pathway banner', label: 'Banner text (leave empty to hide the banner)', long: false, hint: 'Leave empty to hide this part of the page.' },
  { key: 'programDetail.adult.ctaTitle', page: 'Program pages', group: 'Adult Leagues: Bottom call to action', label: 'Title', long: false },
  { key: 'programDetail.adult.ctaDesc', page: 'Program pages', group: 'Adult Leagues: Bottom call to action', label: 'Text', long: true },
  { key: 'programDetail.adult.cta', page: 'Program pages', group: 'Adult Leagues: Bottom call to action', label: 'Button text', long: false },
  { key: 'programDetail.private.hero', page: 'Program pages', group: 'Private Coaching: Top of the page', label: 'Main headline', long: false },
  { key: 'programDetail.private.tagline', page: 'Program pages', group: 'Private Coaching: Top of the page', label: 'Short line under the headline', long: false },
  { key: 'programDetail.private.ages', page: 'Program pages', group: 'Private Coaching: Top of the page', label: 'Age group label', long: false },
  { key: 'programDetail.private.overview', page: 'Program pages', group: 'Private Coaching: Top of the page', label: 'Overview paragraph', long: true },
  { key: 'programDetail.private.philosophyLabel', page: 'Program pages', group: 'Private Coaching: Philosophy quote', label: 'Small label above the quote', long: false },
  { key: 'programDetail.private.philosophy', page: 'Program pages', group: 'Private Coaching: Philosophy quote', label: 'The quote', long: true },
  { key: 'programDetail.private.learnTitle', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Section title', long: false },
  { key: 'programDetail.private.learn1Title', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 1 title', long: false },
  { key: 'programDetail.private.learn1Desc', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 1 text', long: true },
  { key: 'programDetail.private.learn2Title', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 2 title', long: false },
  { key: 'programDetail.private.learn2Desc', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 2 text', long: true },
  { key: 'programDetail.private.learn3Title', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 3 title', long: false },
  { key: 'programDetail.private.learn3Desc', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 3 text', long: true },
  { key: 'programDetail.private.learn4Title', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 4 title', long: false },
  { key: 'programDetail.private.learn4Desc', page: 'Program pages', group: 'Private Coaching: What they will learn', label: 'Card 4 text', long: true },
  { key: 'programDetail.private.formatTitle', page: 'Program pages', group: 'Private Coaching: Format', label: 'Section title', long: false },
  { key: 'programDetail.private.formatDesc', page: 'Program pages', group: 'Private Coaching: Format', label: 'Description', long: true },
  { key: 'programDetail.private.forTitle', page: 'Program pages', group: 'Private Coaching: Who it is for', label: 'Section title', long: false },
  { key: 'programDetail.private.forDesc', page: 'Program pages', group: 'Private Coaching: Who it is for', label: 'Description', long: true },
  { key: 'programDetail.private.pathwayLabel', page: 'Program pages', group: 'Private Coaching: Pathway banner', label: 'Small label (leave empty to hide the banner)', long: false, hint: 'Leave empty to hide this part of the page.' },
  { key: 'programDetail.private.pathway', page: 'Program pages', group: 'Private Coaching: Pathway banner', label: 'Banner text (leave empty to hide the banner)', long: false, hint: 'Leave empty to hide this part of the page.' },
  { key: 'programDetail.private.ctaTitle', page: 'Program pages', group: 'Private Coaching: Bottom call to action', label: 'Title', long: false },
  { key: 'programDetail.private.ctaDesc', page: 'Program pages', group: 'Private Coaching: Bottom call to action', label: 'Text', long: true },
  { key: 'programDetail.private.cta', page: 'Program pages', group: 'Private Coaching: Bottom call to action', label: 'Button text', long: false },
  { key: 'contact.headline', page: 'Contact', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'contact.subtitle', page: 'Contact', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'contact.locationTitle', page: 'Contact', group: 'Location box', label: 'Heading', long: false },
  { key: 'contact.locationDesc', page: 'Contact', group: 'Location box', label: 'First line', long: false },
  { key: 'contact.locationSub', page: 'Contact', group: 'Location box', label: 'Second line', long: false },
  { key: 'contact.locationModel', page: 'Contact', group: 'Location box', label: 'Note about where sessions take place', long: true, hint: 'Explains that sessions take place at partner facilities.' },
  { key: 'contact.instagramTitle', page: 'Contact', group: 'Instagram box', label: 'Title', long: false },
  { key: 'contact.instagramDesc', page: 'Contact', group: 'Instagram box', label: 'Text', long: false },
  { key: 'contact.formTitle', page: 'Contact', group: 'Contact form', label: 'Form heading', long: false },
  { key: 'contact.formName', page: 'Contact', group: 'Contact form', label: 'Name box label', long: false },
  { key: 'contact.formEmail', page: 'Contact', group: 'Contact form', label: 'Email box label', long: false },
  { key: 'contact.formMessage', page: 'Contact', group: 'Contact form', label: 'Message box label', long: false },
  { key: 'contact.formSubmit', page: 'Contact', group: 'Contact form', label: 'Send button', long: false },
  { key: 'contact.responseTime', page: 'Contact', group: 'Contact form', label: 'Reply-time note under the send button', long: false },
  { key: 'contact.formSuccess', page: 'Contact', group: 'Contact form', label: 'Thank-you message', long: false },
  { key: 'contact.formSuccessSub', page: 'Contact', group: 'Contact form', label: 'Thank-you second line', long: false },
  { key: 'contact.formError', page: 'Contact', group: 'Contact form', label: 'Error message', long: false },
  { key: 'register.headline', page: 'Register', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'register.subtitle', page: 'Register', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'register.step1Title', page: 'Register', group: 'Form steps', label: 'Step 1 title (your details)', long: false },
  { key: 'register.step3Title', page: 'Register', group: 'Form steps', label: 'Step 3 title (done screen)', long: false },
  { key: 'register.step3Desc', page: 'Register', group: 'Form steps', label: 'Step 3 text (done screen)', long: false },
  { key: 'register.labelName', page: 'Register', group: 'Form labels', label: 'Name label', long: false },
  { key: 'register.labelEmail', page: 'Register', group: 'Form labels', label: 'Email label', long: false },
  { key: 'register.labelPhone', page: 'Register', group: 'Form labels', label: 'Phone label', long: false },
  { key: 'register.labelProgram', page: 'Register', group: 'Form labels', label: 'Program label', long: false },
  { key: 'register.programYouth', page: 'Register', group: 'Program choices in the form', label: 'Youth option', long: false },
  { key: 'register.programTeen', page: 'Register', group: 'Program choices in the form', label: 'Teen option', long: false },
  { key: 'register.programAdult', page: 'Register', group: 'Program choices in the form', label: 'Adult option', long: false },
  { key: 'register.programPrivate', page: 'Register', group: 'Program choices in the form', label: 'Private option', long: false },
  { key: 'register.submitBtn', page: 'Register', group: 'Buttons', label: 'Continue button', long: false },
  { key: 'register.doneBtn', page: 'Register', group: 'Buttons', label: 'Back to Programs button (done screen)', long: false },
  { key: 'register.placeholderPhone', page: 'Register', group: 'Form labels', label: 'Example shown in the phone box', long: false },
  { key: 'register.closedTitle', page: 'Register', group: 'Registrations closed message', label: 'Title', long: false, hint: 'Shown instead of the form when registrations are switched off in the Registration tab.' },
  { key: 'register.closedDesc', page: 'Register', group: 'Registrations closed message', label: 'Text', long: true },
  { key: 'register.closedCta', page: 'Register', group: 'Registrations closed message', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'gallery.headline', page: 'Gallery', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'gallery.subtitle', page: 'Gallery', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'gallery.filterLabel', page: 'Gallery', group: 'Photo filter buttons', label: 'Filter group name (read by screen readers)', long: false, hint: 'Not visible on screen. It is read aloud to people using screen readers.' },
  { key: 'gallery.filterAll', page: 'Gallery', group: 'Photo filter buttons', label: 'All button', long: false },
  { key: 'gallery.filterYouth', page: 'Gallery', group: 'Photo filter buttons', label: 'Youth button', long: false },
  { key: 'gallery.filterTeen', page: 'Gallery', group: 'Photo filter buttons', label: 'Teen button', long: false },
  { key: 'gallery.filterAdult', page: 'Gallery', group: 'Photo filter buttons', label: 'Adult button', long: false },
  { key: 'gallery.filterEvents', page: 'Gallery', group: 'Photo filter buttons', label: 'Events button', long: false },
  { key: 'gallery.igLabel', page: 'Gallery', group: 'Instagram section', label: 'Title', long: false },
  { key: 'gallery.igDesc', page: 'Gallery', group: 'Instagram section', label: 'Text', long: false },
  { key: 'gallery.instagramCta', page: 'Gallery', group: 'Instagram section', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'schedule.headline', page: 'Schedule', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'schedule.subtitle', page: 'Schedule', group: 'Top of the page', label: 'Line under the headline', long: false },
  { key: 'schedule.comingSoonBadge', page: 'Schedule', group: 'Coming Soon badge', label: 'Badge text', long: false },
  { key: 'schedule.weeklyTitle', page: 'Schedule', group: 'Weekly schedule', label: 'Title', long: false },
  { key: 'schedule.weeklyDesc', page: 'Schedule', group: 'Weekly schedule', label: 'Text', long: true },
  { key: 'schedule.mon', page: 'Schedule', group: 'Days of the week', label: 'Monday', long: false },
  { key: 'schedule.tue', page: 'Schedule', group: 'Days of the week', label: 'Tuesday', long: false },
  { key: 'schedule.wed', page: 'Schedule', group: 'Days of the week', label: 'Wednesday', long: false },
  { key: 'schedule.thu', page: 'Schedule', group: 'Days of the week', label: 'Thursday', long: false },
  { key: 'schedule.fri', page: 'Schedule', group: 'Days of the week', label: 'Friday', long: false },
  { key: 'schedule.sat', page: 'Schedule', group: 'Days of the week', label: 'Saturday', long: false },
  { key: 'schedule.sun', page: 'Schedule', group: 'Days of the week', label: 'Sunday', long: false },
  { key: 'schedule.closed', page: 'Schedule', group: 'Words used in the table', label: 'Closed', long: false },
  { key: 'schedule.tbc', page: 'Schedule', group: 'Words used in the table', label: 'Time to be confirmed', long: false },
  { key: 'schedule.byAppt', page: 'Schedule', group: 'Words used in the table', label: 'By appointment', long: false },
  { key: 'schedule.specialTitle', page: 'Schedule', group: 'Camps & clinics', label: 'Title', long: false },
  { key: 'schedule.specialDesc', page: 'Schedule', group: 'Camps & clinics', label: 'Text', long: true },
  { key: 'schedule.skillsClinic', page: 'Schedule', group: 'Weekly schedule', label: 'Saturday clinic name (in the table)', long: false },
  { key: 'schedule.campHoliday', page: 'Schedule', group: 'Camps & clinics', label: 'Box 1 name', long: false },
  { key: 'schedule.campClinics', page: 'Schedule', group: 'Camps & clinics', label: 'Box 2 name', long: false },
  { key: 'schedule.campTournaments', page: 'Schedule', group: 'Camps & clinics', label: 'Box 3 name', long: false },
  { key: 'schedule.campOpenGym', page: 'Schedule', group: 'Camps & clinics', label: 'Box 4 name', long: false },
  { key: 'schedule.notifyTitle', page: 'Schedule', group: 'Get notified section', label: 'Title', long: false },
  { key: 'schedule.notifyDesc', page: 'Schedule', group: 'Get notified section', label: 'Text', long: true },
  { key: 'schedule.notifyRegister', page: 'Schedule', group: 'Get notified section', label: 'Register Interest button', long: false },
  { key: 'schedule.notifyInstagram', page: 'Schedule', group: 'Get notified section', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'partners.heroTitle', page: 'Partners', group: 'Top of the page', label: 'Main headline', long: false },
  { key: 'partners.heroSubtitle', page: 'Partners', group: 'Top of the page', label: 'Line under the headline', long: true },
  { key: 'partners.opportunityLabel', page: 'Partners', group: 'Opportunity', label: 'Small label above the title', long: false },
  { key: 'partners.opportunityTitle', page: 'Partners', group: 'Opportunity', label: 'Title', long: false },
  { key: 'partners.opportunityDesc1', page: 'Partners', group: 'Opportunity', label: 'Paragraph 1', long: true },
  { key: 'partners.opportunityDesc2', page: 'Partners', group: 'Opportunity', label: 'Paragraph 2', long: true },
  { key: 'partners.sponsorshipLabel', page: 'Partners', group: 'Sponsorship', label: 'Small label above the title', long: false },
  { key: 'partners.sponsorshipTitle', page: 'Partners', group: 'Sponsorship', label: 'Title', long: false },
  { key: 'partners.tier1Title', page: 'Partners', group: 'Sponsorship option 1', label: 'Title', long: false },
  { key: 'partners.tier1Desc', page: 'Partners', group: 'Sponsorship option 1', label: 'Text', long: true },
  { key: 'partners.tier1Badge', page: 'Partners', group: 'Sponsorship option 1', label: 'Badge text', long: false },
  { key: 'partners.tier2Title', page: 'Partners', group: 'Sponsorship option 2', label: 'Title', long: false },
  { key: 'partners.tier2Desc', page: 'Partners', group: 'Sponsorship option 2', label: 'Text', long: true },
  { key: 'partners.tier2Badge', page: 'Partners', group: 'Sponsorship option 2', label: 'Badge text', long: false },
  { key: 'partners.tier3Title', page: 'Partners', group: 'Sponsorship option 3', label: 'Title', long: false },
  { key: 'partners.tier3Desc', page: 'Partners', group: 'Sponsorship option 3', label: 'Text', long: true },
  { key: 'partners.tier3Badge', page: 'Partners', group: 'Sponsorship option 3', label: 'Badge text', long: false },
  { key: 'partners.tier4Title', page: 'Partners', group: 'Sponsorship option 4', label: 'Title', long: false },
  { key: 'partners.tier4Desc', page: 'Partners', group: 'Sponsorship option 4', label: 'Text', long: true },
  { key: 'partners.tier4Badge', page: 'Partners', group: 'Sponsorship option 4', label: 'Badge text', long: false },
  { key: 'partners.sponsorshipNote', page: 'Partners', group: 'Sponsorship', label: 'Note under the options', long: true },
  { key: 'partners.facilitiesLabel', page: 'Partners', group: 'Facilities', label: 'Small label above the title', long: false },
  { key: 'partners.facilitiesTitle', page: 'Partners', group: 'Facilities', label: 'Title', long: false },
  { key: 'partners.facilitiesDesc1', page: 'Partners', group: 'Facilities', label: 'Paragraph 1', long: true },
  { key: 'partners.facilitiesDesc2', page: 'Partners', group: 'Facilities', label: 'Paragraph 2', long: true },
  { key: 'partners.investmentLabel', page: 'Partners', group: 'Investment', label: 'Small label above the title', long: false },
  { key: 'partners.investmentTitle', page: 'Partners', group: 'Investment', label: 'Title', long: false },
  { key: 'partners.investmentDesc1', page: 'Partners', group: 'Investment', label: 'Paragraph 1', long: true },
  { key: 'partners.investmentDesc2', page: 'Partners', group: 'Investment', label: 'Paragraph 2', long: true },
  { key: 'partners.investmentDesc3', page: 'Partners', group: 'Investment', label: 'Paragraph 3', long: true },
  { key: 'partners.getInTouchBtn', page: 'Partners', group: 'Investment', label: 'Get in touch button', long: false },
  { key: 'partners.teamLabel', page: 'Partners', group: 'Team', label: 'Small label above the title', long: false },
  { key: 'partners.teamTitle', page: 'Partners', group: 'Team', label: 'Title', long: false },
  { key: 'partners.teamDesc', page: 'Partners', group: 'Team', label: 'Text', long: true },
  { key: 'partners.role1Title', page: 'Partners', group: 'Team role 1', label: 'Title', long: false },
  { key: 'partners.role1Desc', page: 'Partners', group: 'Team role 1', label: 'Text', long: true },
  { key: 'partners.role2Title', page: 'Partners', group: 'Team role 2', label: 'Title', long: false },
  { key: 'partners.role2Desc', page: 'Partners', group: 'Team role 2', label: 'Text', long: true },
  { key: 'partners.role3Title', page: 'Partners', group: 'Team role 3', label: 'Title', long: false },
  { key: 'partners.role3Desc', page: 'Partners', group: 'Team role 3', label: 'Text', long: true },
  { key: 'partners.role4Title', page: 'Partners', group: 'Team role 4', label: 'Title', long: false },
  { key: 'partners.role4Desc', page: 'Partners', group: 'Team role 4', label: 'Text', long: true },
  { key: 'partners.teamNote', page: 'Partners', group: 'Team', label: 'Note under the roles', long: true },
  { key: 'partners.ctaTitle', page: 'Partners', group: 'Bottom call to action', label: 'Title', long: false },
  { key: 'partners.ctaDesc', page: 'Partners', group: 'Bottom call to action', label: 'Text', long: true },
  { key: 'partners.contactUsBtn', page: 'Partners', group: 'Bottom call to action', label: 'Contact us button', long: false },
  { key: 'partners.instagramCta', page: 'Partners', group: 'Bottom call to action', label: 'Instagram button text (change together with the Instagram link)', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'nav.home', page: 'Menus & footer', group: 'Top menu bar', label: 'Home link', long: false },
  { key: 'nav.about', page: 'Menus & footer', group: 'Top menu bar', label: 'About link', long: false },
  { key: 'nav.programs', page: 'Menus & footer', group: 'Top menu bar', label: 'Programs link', long: false },
  { key: 'nav.contact', page: 'Menus & footer', group: 'Top menu bar', label: 'Contact link', long: false },
  { key: 'nav.register', page: 'Menus & footer', group: 'Top menu bar', label: 'Register link', long: false },
  { key: 'nav.gallery', page: 'Menus & footer', group: 'Top menu bar', label: 'Gallery link', long: false },
  { key: 'nav.schedule', page: 'Menus & footer', group: 'Top menu bar', label: 'Schedule link', long: false },
  { key: 'nav.partners', page: 'Menus & footer', group: 'Top menu bar', label: 'Partners link', long: false },
  { key: 'nav.toggleMenu', page: 'Menus & footer', group: 'Top menu bar', label: 'Mobile menu button (read by screen readers)', long: false, hint: 'Not visible on screen. It is read aloud to people using screen readers.' },
  { key: 'nav.breadcrumbLabel', page: 'Menus & footer', group: 'Top menu bar', label: 'Breadcrumb trail name (read by screen readers)', long: false, hint: 'Not visible on screen. It is read aloud to people using screen readers.' },
  { key: 'footer.tagline', page: 'Menus & footer', group: 'Footer', label: 'Tagline under the logo', long: false },
  { key: 'footer.copyright', page: 'Menus & footer', group: 'Footer', label: 'Copyright line', long: false, hint: 'The year is part of this text, so update it here each January.' },
  { key: 'footer.followUs', page: 'Menus & footer', group: 'Footer', label: 'Small heading above the Instagram button', long: false },
  { key: 'footer.instagramCta', page: 'Menus & footer', group: 'Footer', label: 'Instagram button text', long: false, hint: 'The words on the button. The address it opens is set in the Links tab, so change both together.' },
  { key: 'footer.privacyLabel', page: 'Menus & footer', group: 'Footer', label: 'Privacy Policy link', long: false },
  { key: 'footer.termsLabel', page: 'Menus & footer', group: 'Footer', label: 'Terms & Conditions link', long: false },
  { key: 'footer.accessibilityLabel', page: 'Menus & footer', group: 'Footer', label: 'Accessibility link', long: false },
  { key: 'site.announcement', page: 'Menus & footer', group: 'Announcement banner', label: 'Banner text (leave empty for no banner)', long: false, hint: 'Shows in a green bar at the very top of every page. Leave both boxes empty and no bar appears.' },
];

export type LinkKey = 'instagram';

export type LinkField = {
  key: LinkKey;
  label: string;
  hint: string;
  kind: 'url' | 'email';
  fallback: string;
};

export const LINK_FIELDS: LinkField[] = [
  {
    key: 'instagram',
    label: 'Instagram link',
    hint: 'Every Instagram button on the website opens this address. It must start with https://',
    kind: 'url',
    fallback: 'https://instagram.com/akdovey',
  },
];

export const TEXT_MAX = 2000;
export const LINK_MAX = 300;

type Tree = { [k: string]: string | Tree };

function flatten(o: Tree, prefix = '', out: Record<string, string> = {}): Record<string, string> {
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string') out[prefix + k] = v;
    else flatten(v, prefix + k + '.', out);
  }
  return out;
}

const EN = flatten(en as Tree);
const TH = flatten(th as Tree);

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

// Storage keys look like "en.home.headline", "th.home.headline" or "link.instagram".
const TEXT_DEFAULTS: Record<string, string> = {};
for (const f of CONTENT_FIELDS) {
  TEXT_DEFAULTS['en.' + f.key] = EN[f.key] ?? '';
  TEXT_DEFAULTS['th.' + f.key] = TH[f.key] ?? '';
}
const LINK_DEFAULTS: Record<string, string> = {};
for (const l of LINK_FIELDS) LINK_DEFAULTS['link.' + l.key] = l.fallback;

export function defaultForContentKey(fullKey: string): string | undefined {
  if (has(TEXT_DEFAULTS, fullKey)) return TEXT_DEFAULTS[fullKey];
  if (has(LINK_DEFAULTS, fullKey)) return LINK_DEFAULTS[fullKey];
  return undefined;
}

export function isContentKey(fullKey: string): boolean {
  return has(TEXT_DEFAULTS, fullKey) || has(LINK_DEFAULTS, fullKey);
}

export const fieldStorageKeys = (f: ContentField): string[] => ['en.' + f.key, 'th.' + f.key];

function isHttpsUrl(v: string): boolean {
  // The prefix check matters: the URL parser is lenient and would accept "https:/x.y".
  if (!/^https:\/\//i.test(v)) return false;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' && u.hostname.includes('.') && !u.username && !u.password;
  } catch {
    return false;
  }
}

// Returns the cleaned value, or an error message the dashboard can show as-is.
// A field whose built-in text is empty (for example the announcement banner)
// may be left empty; every other field must have text.
export function cleanContentValue(
  fullKey: string,
  raw: string,
): { ok: true; value: string } | { ok: false; error: string } {
  if (!isContentKey(fullKey)) return { ok: false, error: 'Unknown field.' };
  if (typeof raw !== 'string') return { ok: false, error: 'Invalid value.' };
  const value = raw.replace(/\s*[\r\n]+\s*/g, ' ').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

  if (!value) {
    return defaultForContentKey(fullKey) === ''
      ? { ok: true, value: '' }
      : { ok: false, error: "This can't be empty. Use Reset to go back to the original." };
  }

  if (fullKey.startsWith('link.')) {
    if (value.length > LINK_MAX) return { ok: false, error: 'That link is too long.' };
    const kind = LINK_FIELDS.find((l) => 'link.' + l.key === fullKey)?.kind;
    if (kind === 'email') {
      return /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(value)
        ? { ok: true, value }
        : { ok: false, error: 'Enter a valid email address, like name@example.com.' };
    }
    return isHttpsUrl(value) ? { ok: true, value } : { ok: false, error: 'Enter a full web address starting with https://' };
  }

  if (value.length > TEXT_MAX) return { ok: false, error: 'That text is too long (2000 characters at most).' };
  // The site's translation system treats these characters as code, so one stray bracket would break the page.
  if (/[{}<>]/.test(value)) return { ok: false, error: 'Curly brackets and < > signs are not allowed in the text.' };
  return { ok: true, value };
}
