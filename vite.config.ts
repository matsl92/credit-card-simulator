import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@src': path.resolve(__dirname, './src'),
    }
  },
  plugins: [react()],
})
