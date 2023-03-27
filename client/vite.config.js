import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost' //'192.168.43.231'
  },
  plugins: [react()]
})
