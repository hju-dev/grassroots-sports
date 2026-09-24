// Every replaceable image on the public site. Plain data with no server
// imports, so both server code and the dashboard's client editor can use it.
// The bundled default of each slot is the fallback everywhere: if the database
// can't be read, or nothing has been published, the site shows these.

export const SLOT_KEYS = [
  'site_logo',
  'social_share',
  'home_hero_photo',
  'home_strip_left',
  'home_strip_right',
  'about_story_photo',
  'about_why_photo',
] as const;

export type SlotKey = (typeof SLOT_KEYS)[number];

export type SlotImage = { src: string; width: number; height: number; alt: string };

export type SlotDef = {
  key: SlotKey;
  page: 'Every page' | 'Home page' | 'About page';
  label: string;
  where: string;
  tip: string;
  fallback: SlotImage;
};

// What the dashboard editor shows for each slot: the image live now (with both
// languages of its description) plus any unpublished replacement.
export type SlotView = {
  key: SlotKey;
  current: { src: string; width: number; height: number };
  alt_en: string;
  alt_th: string;
  isCustom: boolean;
  draft: { url: string; width: number; height: number } | null;
};

export const SLOT_PAGES = ['Every page', 'Home page', 'About page'] as const;

export const IMAGE_SLOTS: SlotDef[] = [
  {
    key: 'site_logo',
    page: 'Every page',
    label: 'Logo',
    where: 'The round logo in the top menu bar and footer of every page, and the small logo on the home page.',
    tip: 'A square picture works best; it is shown inside a white circle. Keep the important part in the middle.',
    fallback: { src: '/logo.png', width: 1254, height: 1254, alt: 'Grass Roots Sports' },
  },
  {
    key: 'social_share',
    page: 'Every page',
    label: 'Picture shown when the site is shared',
    where: 'The picture that appears when someone shares a link to the home page or a program page on Facebook, LINE or WhatsApp.',
    tip: 'A square picture, at least 800 by 800 pixels. Changes can take a few days to show up in apps that remember old previews.',
    fallback: { src: '/logo.jpg', width: 1080, height: 1080, alt: 'Grass Roots Sports' },
  },
  {
    key: 'home_hero_photo',
    page: 'Home page',
    label: 'Main photo',
    where: 'The large photo at the top of the home page, next to "Where Athletes Grow. Communities Connect."',
    tip: 'Shown as a tall rectangle, so use a photo with the action in the middle. Portrait or square photos work best.',
    fallback: { src: '/images/game-action.webp', width: 1518, height: 1016, alt: 'Grass Roots Sports player in action' },
  },
  {
    key: 'home_strip_left',
    page: 'Home page',
    label: 'Photo strip, left',
    where: 'The left photo in the dark strip just below the top of the home page.',
    tip: 'Shown as a wide rectangle (16 by 9), so a landscape photo works best.',
    fallback: { src: '/images/team-huddle.webp', width: 1275, height: 1234, alt: 'Grassroots Sports team' },
  },
  {
    key: 'home_strip_right',
    page: 'Home page',
    label: 'Photo strip, right',
    where: 'The right photo in the dark strip just below the top of the home page.',
    tip: 'Shown as a wide rectangle (16 by 9), so a landscape photo works best.',
    fallback: { src: '/images/coach-huddle.webp', width: 1528, height: 1008, alt: 'Coaching session' },
  },
  {
    key: 'about_story_photo',
    page: 'About page',
    label: 'Our Story photo',
    where: 'The wide photo in the middle of the "Our Story" text.',
    tip: 'Shown as a wide rectangle (16 by 9), so a landscape group photo works best.',
    fallback: { src: '/images/community-group.webp', width: 1440, height: 1394, alt: 'Grass Roots Sports community: players and coaches together' },
  },
  {
    key: 'about_why_photo',
    page: 'About page',
    label: '"Why Grass Roots?" photo',
    where: 'The tall photo next to the "Why Grass Roots?" list.',
    tip: 'Shown as a tall rectangle, so a portrait photo works best.',
    fallback: { src: '/images/youth-scrimmage.webp', width: 1526, height: 1000, alt: 'Young players in a Grass Roots Sports scrimmage' },
  },
];
