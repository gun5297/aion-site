// @ts-check
import { readdir, rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

/**
 * Photo provenance sidecars (public/images/*.webp.json) stay in the repo for
 * `impeccable embed-prompt --scan`, but are not published with the site.
 * @type {import('astro').AstroIntegration}
 */
const stripImageSidecars = {
  name: 'strip-image-sidecars',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const images = new URL('images/', dir);
      for (const file of await readdir(images)) {
        if (file.endsWith('.json')) await rm(new URL(file, images));
      }
    },
  },
};

export default defineConfig({
  // Deployed to GitHub Pages; the deploy workflow sets SITE_URL/BASE_PATH for the custom domain
  // (aion-int.com). The defaults below are the project-site URL (used for links, canonical and hreflang).
  site: process.env.SITE_URL ?? 'https://gun5297.github.io',
  base: process.env.BASE_PATH ?? '/aion-site',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'ko'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [stripImageSidecars],
});
