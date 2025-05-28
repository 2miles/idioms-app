import { chromium } from '@playwright/test';
import { loginWithAuth0 } from '../utils/authHelper';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './e2e/.env' });

const users = [
  {
    name: 'admin',
    email: process.env.TEST_ADMIN_EMAIL!,
    password: process.env.TEST_ADMIN_PASSWORD!,
  },
  {
    name: 'user',
    email: process.env.TEST_USER_EMAIL!,
    password: process.env.TEST_USER_PASSWORD!,
  },
];

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const authDir = path.resolve('e2e/.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  for (const user of users) {
    try {
      await loginWithAuth0(page, user.email, user.password);
      await context.storageState({ path: `${authDir}/${user.name}.json` });
      console.log(`✅ Saved auth state for ${user.name}`);

      await page.getByRole('button', { name: /log out/i }).click();
      await page.getByRole('button', { name: /log in/i }).waitFor();
    } catch (err) {
      console.error(`❌ Failed for ${user.name}`, err);
    }
  }

  await browser.close();
})();
// ********** Usage example **********

// import { test, expect } from '@playwright/test';

// test.use({ storageState: '.auth/admin.json' });

// test('admin can view dashboard', async ({ page }) => {
//   await page.goto('http://localhost:5173/dashboard');
//   await expect(page.getByText('Welcome, Admin')).toBeVisible();
// });
