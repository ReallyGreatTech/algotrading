import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     'chartjs-adapter-date-fns': 'node_modules/chartjs-adapter-date-fns',
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     external: ['chartjs-adapter-date-fns'],
  //   },
  // },
})
