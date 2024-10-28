// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig( {
  integrations: [ tailwind() ],
  output: 'hybrid', // esto dice que es estático por defecto salvo lo que le diga que tiene que ser dinámico

  adapter: node( {
    mode: 'standalone'
  } )
} );