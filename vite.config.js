import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // 반드시 dist로 설정
    emptyOutDir: true, // 기존 빌드 파일을 삭제
  },
  base: './', // 상대 경로 설정 (Vercel에서 정적 파일 찾기 오류 방지)
  server: {
    strictPort: true, // 개발시 포트 충돌 방지
  },
});
