import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
import { configDefaults } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const viteEnv = env.VITE_APP_ENV;
  const isTest = viteEnv === 'test';
  const isDev = viteEnv === 'dev';

  const proxyTarget = isTest
    ? 'http://127.0.0.1:3010'
    : isDev
    ? 'http://server:3001' // Docker service name in dev
    : undefined;

  return {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      ...(proxyTarget && {
        proxy: {
          '/api': {
            target: proxyTarget,
            changeOrigin: true,
            secure: false,
          },
        },
      }),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: [...configDefaults.exclude, '**/e2e/**'],
      coverage: {
        reportsDirectory: '../.test-output/coverage',
      },
    },
  };
});
