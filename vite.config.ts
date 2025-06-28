/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';
import banner from 'vite-plugin-banner';

const bannerText = `Developed by Flexisaf Edusoft.  
\n Visit the '/3rd-party-licenses.txt' route on this host to view 3rd-party licenses and copyright notices. 
\n For instance if this host (serving this page) is www.example.com then it would be www.example.com/3rd-party-licenses.txt
`;

const timestamp = new Date().getTime();
export default defineConfig({
  server: {
    https: {},
  },
  define: {
    'process.env': { ...process.env },
    global: 'window',
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    mkcert(),
    tsconfigPaths(),
    banner(bannerText) as unknown as Plugin,
  ],
  optimizeDeps: {
    exclude: ['node_modules'],
  },
  assetsInclude: ['**/*.xlsx'],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',

    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/src/utils/**',
      '**/src/generated/**',
      '**/src/redux/**',
      '@flexisaf/flexibull2',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${timestamp}.js`,
        chunkFileNames: `assets/[name].${timestamp}.js`,
        assetFileNames: `assets/[name].${timestamp}.[ext]`,
      },
    },
  },
});
