// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/perfecthash-ui/',
    plugins: [react()],
    server: {
        port: 3005,
    },
    build: {
        outDir: 'docs', // Output directory for builds
    },
});