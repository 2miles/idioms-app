// VERSION THAT WORSK ON DEV ONLY
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { configDefaults, defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     host: '0.0.0.0', // This allows access from other devices on the local network
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://server:3001', // 👈 Docker service name for backend
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//     exclude: [...configDefaults.exclude, '**/e2e/**'],
//     coverage: {
//       reportsDirectory: '../.test-output/coverage',
//     },
//   },
// });

// OLD VERSION
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { configDefaults, defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     host: '0.0.0.0', // This allows access from other devices on the local network
//     port: 5173,
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//     exclude: [...configDefaults.exclude, '**/e2e/**'],
//     coverage: {
//       reportsDirectory: '../.test-output/coverage',
//     },
//   },
// });

import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { loadEnv } from 'vite';

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
    plugins: [react()],
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
