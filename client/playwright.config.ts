import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
/**

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  testIgnore: ['**/tests/example.spec.ts', '**/tests-examples/**'],
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  timeout: process.env.CI ? 60000 : 30000, // 60 seconds for CI, 30 seconds otherwise
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: isDeployed ? [['list']] : [['html', { outputFolder: './playwright' }]],
  outputDir: './test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://127.0.0.1:3000',
    baseURL: 'http://localhost:5174',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // trace: isDeployed
    //   ? 'off'
    //   : {
    //       mode: 'on',
    //       snapshots: true,
    //       screenshots: true,
    //       sources: true,
    //       attachments: true,
    //     },
    // Set actionTimeout and navigationTimeout based on CI environment
    actionTimeout: process.env.CI ? 45000 : 10000, // 30 seconds for CI, 10 seconds otherwise
    navigationTimeout: process.env.CI ? 30000 : 10000, // 30 seconds for CI, 10 seconds otherwise
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   reuseExistingServer: !process.env.CI,
  // },
});
