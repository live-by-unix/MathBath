import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { base44 } from '@base44/sdk/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  logLevel: 'error',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    base44({
      legacySDKImports:
        process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true,
    }),

    react(),
  ],
});