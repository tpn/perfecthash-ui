// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const base = '/perfecthash-ui/';

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
    /*
    resolve: {
        alias: {
            'react-bootstrap-icons': path.resolve(__dirname, 'node_modules/react-bootstrap-icons/dist'),
            'react-icons': path.resolve(__dirname, 'node_modules/react-icons')
        }
    },
    optimizeDeps: {
        include: [
            //'react-bootstrap-icons',
        ],
    },
    */
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