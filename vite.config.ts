import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 确保 public 目录作为静态资源根目录被拷贝
  publicDir: 'public',
  // Cloudflare Pages 部署推荐使用绝对根路径
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
  }
})