import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Users } from './src/collections/Users';
import { Media } from './src/collections/Media';
import { Products } from './src/collections/Products';
import { Pages } from './src/collections/Pages';
import { Posts } from './src/collections/Posts';
import { Settings } from './src/globals/Settings';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  sharp,
  localization: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
  },
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
  collections: [Users, Media, Products, Pages, Posts],
  globals: [Settings],
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      clientUploads: true,
    }),
  ],
});
