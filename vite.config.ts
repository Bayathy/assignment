/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import KumaUI from '@kuma-ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), KumaUI()],
  server: {
    cors: true,
  },
  test: {
    name: 'react',
    root: './src',
    environment: 'happy-dom',
    setupFiles: ['./setup-test.ts'],
  },
})
