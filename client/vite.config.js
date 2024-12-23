import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Explicitly specify port
    host: 'localhost', // Ensure it binds to localhost
  },
});
