import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '23cupy4l',
  dataset: 'production',
  apiVersion: '2026-08-06',
  useCdn: true,
});
