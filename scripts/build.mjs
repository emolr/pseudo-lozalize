import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildConfigs = [
  {
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, '../src/pseudo-localize.ts'),
      fileName: 'pseudo-localize',
      formats: ['es', 'cjs'],
    },
    emptyOutDir: true,
  },
  {
    outDir: './dist',
    lib: {
      entry: path.resolve(__dirname, '../src/pseudo-localize-bookmark.ts'),
      fileName: 'pseudo-localize-bookmark',
      formats: ['iife'],
    },
    emptyOutDir: false,
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
];

buildConfigs.forEach(async (buildConfig) => {
  await build({
    build: buildConfig,
  });
});
