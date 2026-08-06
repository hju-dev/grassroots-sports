// GROQ queries — ready to use once sanityClient is active

// Fetch all program pricing + availability
export const PROGRAMS_QUERY = `*[_type == "program"] {
  slug,
  priceThb,
  pricePeriod,
  sessionCount,
  sessionDurationMinutes,
  maxParticipants,
  isActive,
  heroEn,
  heroTh,
  overviewEn,
  overviewTh
}`;

// Fetch a single program by slug
export const PROGRAM_QUERY = `*[_type == "program" && slug == $slug][0] {
  slug,
  priceThb,
  pricePeriod,
  sessionCount,
  sessionDurationMinutes,
  maxParticipants,
  isActive,
  heroEn,
  heroTh,
  overviewEn,
  overviewTh
}`;

// Fetch published news posts (newest first)
export const NEWS_QUERY = `*[_type == "news" && published == true] | order(publishedAt desc) {
  titleEn,
  titleTh,
  "slug": slug.current,
  publishedAt,
  bodyEn,
  bodyTh,
  "imageUrl": image.asset->url
}`;

// Fetch site settings singleton
export const SETTINGS_QUERY = `*[_type == "settings"][0] {
  promptpayNumber,
  contactEmail,
  instagramHandle,
  location,
  announcementBannerEn,
  announcementBannerTh,
  registrationsOpen
}`;
