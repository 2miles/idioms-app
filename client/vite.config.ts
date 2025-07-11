// import { configDefaults, defineConfig} from 'vitest/config';
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
import { configDefaults, defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env variables like VITE_APP_ENV
  const env = loadEnv(mode, process.cwd(), '');

  const isTest = env.VITE_APP_ENV === 'test';
  const isDev = env.VITE_APP_ENV === 'dev';

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
      proxy: {
        '/api': {
          target: isTest
            ? 'http://localhost:3010' // ✅ GitHub Actions / test env
            : 'http://server:3001', // ✅ Docker / local dev
          changeOrigin: true,
          secure: false,
        },
      },
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
