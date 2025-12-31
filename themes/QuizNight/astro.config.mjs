import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://logic-game-page.vercel.app',
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    }
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    })
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@astrojs/react']
    }
  }
});
