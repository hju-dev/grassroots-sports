import { z } from 'zod';
import { GALLERY_CATEGORIES, GALLERY_TEXT_FIELDS, GALLERY_TEXT_MAX } from './gallery-defs';

// Control characters never belong in text that ends up in HTML attributes or captions.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const galleryIdSchema = z.uuid();
export const galleryIdsSchema = z.array(galleryIdSchema).max(200);
export const galleryCategorySchema = z.enum(GALLERY_CATEGORIES);
export const galleryTextFieldSchema = z.enum(GALLERY_TEXT_FIELDS);

export function cleanGalleryText(field: string, value: unknown): string {
  const f = galleryTextFieldSchema.parse(field);
  if (typeof value !== 'string') throw new Error('Text must be a string');
  const cleaned = value.replace(CONTROL_CHARS, '').replace(/\s+/g, ' ').trim();
  if (cleaned.length > GALLERY_TEXT_MAX[f]) {
    throw new Error(`Too long (max ${GALLERY_TEXT_MAX[f]} characters)`);
  }
  return cleaned;
}
