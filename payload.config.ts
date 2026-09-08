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
      // disablePayloadAccessControl makes the plugin return real
      // *.public.blob.vercel-storage.com URLs. Without it, the cloud-storage
      // plugin's afterRead/beforeChange hooks never call the adapter's
      // generateURL and silently keep Payload's default local-disk URL
      // (/api/media/file/<name>) even though the file itself is correctly
      // uploaded to Blob — this was the actual cause of every image 400/404ing.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: false,
    }),
  ],
});
