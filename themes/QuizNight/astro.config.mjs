import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
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
    },
    build: {
      rollupOptions: {
        output: {
          // Dla WordPress bundle
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            if (id.includes('src/components')) {
              return 'components';
            }
          }
        }
      }
    }
  },
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  experimental: {
    responsiveImages: true,
    svg: true
  }
});
