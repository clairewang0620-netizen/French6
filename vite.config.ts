import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键配置：使用相对路径，确保在 GitHub Pages 等子目录部署时资源路径正确
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})