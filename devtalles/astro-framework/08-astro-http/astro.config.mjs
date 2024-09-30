import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// import node from '@astrojs/node'; la desistalo si queiro hacer la integración y despliegue en cloudflare
import cloudflare from '@astrojs/cloudflare';

import db from '@astrojs/db';


import vue from '@astrojs/vue';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), vue()],
  output: 'hybrid',
  adapter: cloudflare(),
  // adapter: node({
  //   mode: 'standalone',
  // }),
  // experimental: {
  //   actions: true, // esto no hace falta porque ya no están en experimental
  // },
});