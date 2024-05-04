import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, './build'),
  },
  plugins: [svelte()],
  publicDir: resolve(__dirname, './static'),
  resolve: {
    alias: {
      $lib: resolve(__dirname, './src/lib'),
    },
  },
});
