import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 绝对根路径，确保 /audio/... 始终指向域名根目录
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 强制拷贝 public 目录
    copyPublicDir: true,
  }
})