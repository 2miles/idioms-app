import { Page } from '@playwright/test';

export async function loginWithAuth0(page: Page, email: string, password: string) {
  await page.goto('http://localhost:5173');

  // Click your app's login button
  await page.getByRole('button', { name: /log in/i }).click();

  // Wait for Universal Login page
  await page.waitForURL(/auth0\.com/);

  // Fill Auth0 form
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Password').fill(password);
  //await page.getByRole('button', { name: /continue/i }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  // Optional: handle post-login consent (if your app requires user consent)
  const acceptBtn = page.getByRole('button', { name: /accept/i });
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
  }

  // Wait to be redirected back to your app
  await page.waitForURL('http://localhost:5173/**');
}

// Usage example -----------

// import { test } from '@playwright/test';
// import { loginWithAuth0 } from '../utils/authHelper';

// test('authenticated flow', async ({ page }) => {
//   await loginWithAuth0(page, 'test.admin@example.com', 'supersecuretestpassword');

//   // Now test app features that require login
//   await page.getByText('Welcome, Admin').isVisible();
// });
