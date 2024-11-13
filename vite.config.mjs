// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const base = '';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                $base-url: '${base}';
                `,
            },
        },
    },
    base: base,
    plugins: [react()],
    server: {
        port: 3005,
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync(path.resolve('/home/trent/.certs/trent.me-server.key.decrypted')),
            cert: fs.readFileSync(path.resolve('/home/trent/.certs/trent.me-server-bundle.crt')),
        }
    },
    preview: {
        host: '0.0.0.0',
        https: {
            key: fs.readFileSync(path.resolve('/home/trent/.certs/trent.me-server.key.decrypted')),
            cert: fs.readFileSync(path.resolve('/home/trent/.certs/trent.me-server-bundle.crt')),
        }
    },
    build: {
        outDir: 'docs',
    },
});
