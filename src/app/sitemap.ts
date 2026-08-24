import type { MetadataRoute } from 'next';

const BASE = 'https://grassrootssports.org';
const LOCALES = ['en', 'th'];

const routes = [
  { path: '',                     priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/about',               priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs',            priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/programs/youth',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs/teen',       priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs/adult',      priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs/private',    priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery',             priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/schedule',            priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/partners',            priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact',             priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy',             priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/terms',               priority: 0.3, changeFrequency: 'yearly'  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified,
      changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority,
    }))
  );
}
