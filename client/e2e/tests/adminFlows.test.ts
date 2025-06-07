import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

import { ADD_IDIOM_FORM_DATA_1 } from '../test-data/idioms.js';
import { HomePage } from '../pages/HomePage.js';
import { DetailPage } from '../pages/DetailPage.js';
import { AddIdiomModal } from '../pages/AddIdiomModal.js';

test.use({ storageState: './e2e/.auth/admin.json' });

test.describe('Admin: Idiom management', () => {
  test('can add idiom, view detail page, and delete an idiom', async ({ page }) => {
    const homePage = new HomePage(page);
    const detailPage = new DetailPage(page);
    const addIdiomModal = new AddIdiomModal(page);

    const testTitle = `${ADD_IDIOM_FORM_DATA_1.title} ${randomUUID().slice(0, 8)}`;

    // Navigate to the homepage
    await homePage.goTo();

    // Open and fill the Add Idiom modal
    await homePage.openAddIdiomModal();
    await addIdiomModal.fillForm({
      title: testTitle,
      titleGeneral: ADD_IDIOM_FORM_DATA_1.title_general ?? '',
      definition: ADD_IDIOM_FORM_DATA_1.definition ?? '',
      contributor: ADD_IDIOM_FORM_DATA_1.contributor ?? '',
    });

    // Submit and wait for idioms to reload
    await addIdiomModal.submit();
    await page.waitForLoadState('networkidle');

    // Verify idiom was added
    await expect(page.getByText(testTitle, { exact: true })).toBeVisible({ timeout: 10000 });

    // Navigate to detail page and delete idiom
    await homePage.clickTableRowWithText(testTitle);
    await detailPage.openEditIdiomModal();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes, delete it!' }).click();

    // Confirm idiom is gone
    await expect(page.getByText(testTitle)).not.toBeVisible();
  });
});
