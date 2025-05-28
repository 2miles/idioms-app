import { Page } from '@playwright/test';

export async function loginWithAuth0(page: Page, email: string, password: string) {
  // 🔁 Make sure the dev server URL matches your test port
  const appUrl = 'http://localhost:5174';
  const postLoginIndicator = 'button:has-text("Log Out")';

  // Go to app and click "Log In"
  await page.goto(appUrl);
  await page.getByRole('button', { name: /log in/i }).click();

  // Wait for Auth0 Universal Login redirect
  await page.waitForURL(/auth0\.com/);

  // Fill login form
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  // Optional: handle consent prompt (first login / tenant config)
  const acceptBtn = page.getByRole('button', { name: /accept/i });
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
  }

  // Wait until redirected back to the app
  await page.waitForURL(`${appUrl}/**`, { waitUntil: 'load' });

  // Optional: wait for an element that confirms login was successful
  await page.waitForSelector(postLoginIndicator, { timeout: 10000 });
}

// Usage example -----------

// import { test } from '@playwright/test';
// import { loginWithAuth0 } from '../utils/authHelper';

// test('authenticated flow', async ({ page }) => {
//   await loginWithAuth0(page, 'test.admin@example.com', 'supersecuretestpassword');

//   // Now test app features that require login
//   await page.getByText('Welcome, Admin').isVisible();
// });
