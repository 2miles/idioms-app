import { test as base } from '@playwright/test';

export const testAdmin = base.extend({
  storageState: 'e2e/.auth/admin.json',
});

export const testUser = base.extend({
  storageState: 'e2e/.auth/user.json',
});

export const testGuest = base; // no auth

// ********* Usage example *********

// // ADMIN
// // e2e/tests/admin-only.spec.ts
// import { testAdmin } from '../utils/roles';

// testAdmin('admin can edit idiom', async ({ page }) => {
//   await page.goto('/idioms/1');
//   await page.getByRole('button', { name: /edit idiom/i }).click();
//   // ...assertions
// });

// // USER
// import { testGuest } from '../utils/roles';

// testGuest('guest cannot see edit button', async ({ page }) => {
//   await page.goto('/idioms/1');
//   await expect(page.getByRole('button', { name: /edit/i })).toHaveCount(0);
// });
