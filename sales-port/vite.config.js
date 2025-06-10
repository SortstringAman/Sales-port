import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: true,        // This makes Vite listen on all network interfaces
    port: 5173,        // Optional: choose any available port
  },
})
