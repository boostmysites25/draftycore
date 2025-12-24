import { defineConfig } from 'vite'
// Config updated to force reload
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
})
