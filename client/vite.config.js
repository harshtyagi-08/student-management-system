import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const railwayHost = 'sams-web-production.up.railway.app';

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173 },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    allowedHosts: [railwayHost],
  },
});
