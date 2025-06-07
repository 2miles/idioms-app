import { chromium } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config({ path: './e2e/.env' });

async function loginAndSaveState(email: string, password: string, storagePath: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.login(email, password);

  // Optional post-login consent
  try {
    await page.getByRole('button', { name: /accept/i }).click({ timeout: 5000 });
  } catch (_) {}

  await page.waitForURL('**/callback*', { timeout: 10000 }).catch(() => {});
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: storagePath });

  await browser.close();
}

const adminAuthPath = './e2e/.auth/admin.json';
const userAuthPath = './e2e/.auth/user.json';

async function globalSetup() {
  if (!process.env.TEST_ADMIN_EMAIL || !process.env.TEST_ADMIN_PASSWORD)
    throw new Error('Missing TEST_ADMIN_EMAIL or TEST_ADMIN_PASSWORD');
  if (!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD)
    throw new Error('Missing TEST_USER_EMAIL or TEST_USER_PASSWORD');

  await loginAndSaveState(
    process.env.TEST_ADMIN_EMAIL,
    process.env.TEST_ADMIN_PASSWORD,
    adminAuthPath,
  );
  await loginAndSaveState(
    process.env.TEST_USER_EMAIL,
    process.env.TEST_USER_PASSWORD,
    userAuthPath,
  );
}

export default globalSetup;
