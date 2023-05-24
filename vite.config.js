import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, './src/utils/constants.jsx'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@FireContext': path.resolve(__dirname, './src/Firebase/Contexts/FirebaseContext.jsx'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
