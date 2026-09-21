import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH é definido no GitHub Actions ("/paru-site/" no GitHub Pages).
// Localmente, e num domínio próprio, fica "./".
export default defineConfig({
  base: process.env.BASE_PATH || './',
  plugins: [react()],
})
