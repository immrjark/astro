import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig( {
  integrations: [ tailwind(), icon(), solidJs() ],
  output: "hybrid",
  adapter: vercel()
} );