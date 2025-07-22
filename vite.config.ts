import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mediapipePlugin from './modules/vite/mediapipe'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mediapipePlugin(),
    vue(),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  }
})
