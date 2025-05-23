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
  for (const user of users) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const authDir = path.resolve('e2e/.auth');
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    await loginWithAuth0(page, user.email, user.password);

    await context.storageState({ path: `e2e/.auth/${user.name}.json` });
    await browser.close();

    console.log(`Saved auth state for ${user.name}`);
  }
})();

// ********** Usage example **********

// import { test, expect } from '@playwright/test';

// test.use({ storageState: '.auth/admin.json' });

// test('admin can view dashboard', async ({ page }) => {
//   await page.goto('http://localhost:5173/dashboard');
//   await expect(page.getByText('Welcome, Admin')).toBeVisible();
// });
