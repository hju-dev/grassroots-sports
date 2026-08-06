import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'grassroots-sports',
  title: 'Grass Roots Sports',
  projectId: '23cupy4l',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
