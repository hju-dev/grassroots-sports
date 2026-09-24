// Plain data and types with no server imports, so the dashboard's client
// editor and the server code can both use it.

export const GALLERY_CATEGORIES = ['youth', 'teen', 'adult', 'events'] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  youth: 'Youth',
  teen: 'Teen',
  adult: 'Adult',
  events: 'Events',
};

export type GalleryPhoto = {
  id: string;
  url: string;
  width: number;
  height: number;
  alt_en: string;
  alt_th: string;
  caption_en: string;
  caption_th: string;
  category: GalleryCategory;
  published: boolean;
  sort_order: number;
};

export const GALLERY_TEXT_FIELDS = ['alt_en', 'alt_th', 'caption_en', 'caption_th'] as const;
export type GalleryTextField = (typeof GALLERY_TEXT_FIELDS)[number];

export const GALLERY_TEXT_MAX: Record<GalleryTextField, number> = {
  alt_en: 300,
  alt_th: 300,
  caption_en: 120,
  caption_th: 120,
};
