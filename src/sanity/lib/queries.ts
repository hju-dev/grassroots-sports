export const SETTINGS_QUERY = `*[_type == "settings"][0] {
  promptpayNumber,
  contactEmail,
  instagramHandle,
  location,
  announcementBannerEn,
  announcementBannerTh,
  registrationsOpen,
  bioEn,
  bioTh,
  heroHeadlineEn, heroHeadlineTh,
  heroSubheadlineEn, heroSubheadlineTh,
  missionTitleEn, missionTitleTh,
  mission1TitleEn, mission1TitleTh, mission1DescEn, mission1DescTh,
  mission2TitleEn, mission2TitleTh, mission2DescEn, mission2DescTh,
  mission3TitleEn, mission3TitleTh, mission3DescEn, mission3DescTh,
  igSectionTitleEn, igSectionTitleTh,
  igSectionSubtitleEn, igSectionSubtitleTh,
  aboutHeadlineEn, aboutHeadlineTh,
  aboutSubtitleEn, aboutSubtitleTh,
  whyTitleEn, whyTitleTh,
  why1TitleEn, why1TitleTh, why1DescEn, why1DescTh,
  why2TitleEn, why2TitleTh, why2DescEn, why2DescTh,
  why3TitleEn, why3TitleTh, why3DescEn, why3DescTh,
  comingTitleEn, comingTitleTh, comingDescEn, comingDescTh,
  contactHeadlineEn, contactHeadlineTh,
  contactSubtitleEn, contactSubtitleTh,
  locationDescEn, locationDescTh, locationSubEn, locationSubTh,
  footerTaglineEn, footerTaglineTh
}`;

export const PROGRAMS_QUERY = `*[_type == "program"] {
  slug, priceThb, pricePeriod, sessionCount, sessionDurationMinutes,
  maxParticipants, isActive, heroEn, heroTh, overviewEn, overviewTh
}`;

export const PROGRAM_QUERY = `*[_type == "program" && slug == $slug][0] {
  slug, priceThb, pricePeriod, sessionCount, sessionDurationMinutes,
  maxParticipants, isActive,
  heroEn, heroTh,
  taglineEn, taglineTh,
  agesEn, agesTh,
  overviewEn, overviewTh,
  philosophyLabelEn, philosophyLabelTh,
  philosophyEn, philosophyTh,
  learnTitleEn, learnTitleTh,
  learn1TitleEn, learn1TitleTh, learn1DescEn, learn1DescTh,
  learn2TitleEn, learn2TitleTh, learn2DescEn, learn2DescTh,
  learn3TitleEn, learn3TitleTh, learn3DescEn, learn3DescTh,
  learn4TitleEn, learn4TitleTh, learn4DescEn, learn4DescTh,
  formatTitleEn, formatTitleTh, formatDescEn, formatDescTh,
  forTitleEn, forTitleTh, forDescEn, forDescTh,
  pathwayLabelEn, pathwayLabelTh, pathwayEn, pathwayTh,
  ctaTitleEn, ctaTitleTh, ctaDescEn, ctaDescTh
}`;

export const NEWS_QUERY = `*[_type == "news" && published == true] | order(publishedAt desc) {
  titleEn, titleTh,
  "slug": slug.current,
  publishedAt,
  bodyEn, bodyTh,
  "imageUrl": image.asset->url
}`;

export const GALLERY_QUERY = `*[_type == "galleryPhoto"] | order(order asc) {
  captionEn, captionTh, category,
  "imageUrl": image.asset->url,
  "lqip": image.asset->metadata.lqip
}`;
