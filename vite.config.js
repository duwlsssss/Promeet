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
  base: '/', // 절대 경로: 중첩 경로에서 새로고침해도 /assets/를 찾도록 (상대 경로면 /promise/:id/assets/로 요청됨)
  server: {
    strictPort: true, // 개발시 포트 충돌 방지
  },
});
