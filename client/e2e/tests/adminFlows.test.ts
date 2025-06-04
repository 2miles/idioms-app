import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

import { Idiom } from '../../src/types.js';
import { TEST_IDIOM_1 } from '../test-data/idioms.js';
import { HomePage } from '../pages/HomePage.js';
import { DetailPage } from '../pages/DetailPage.js';
import { AddIdiomModal } from '../pages/AddIdiomModal.js';

test.use({ storageState: './e2e/.auth/admin.json' });

test.describe('Admin: Idiom management', () => {
  test('can add and delete an idiom', async ({ page }) => {
    const homePage = new HomePage(page);
    const detailPage = new DetailPage(page);
    const addIdiomModal = new AddIdiomModal(page);

    const testTitle = `${TEST_IDIOM_1.title} ${randomUUID().slice(0, 8)}`;
    let createdIdiom: Idiom;

    await homePage.goTo();

    await homePage.openAddIdiomModal();

    await addIdiomModal.titleInput.fill(testTitle);
    await addIdiomModal.titleGeneralInput.fill(TEST_IDIOM_1.title_general ?? '');
    await addIdiomModal.definitionInput.fill(TEST_IDIOM_1.definition ?? '');
    await addIdiomModal.contributorInput.fill(TEST_IDIOM_1.contributor ?? '');

    await Promise.all([
      page
        .waitForResponse(
          (res) => res.url().includes('/api/v1/idioms') && res.request().method() === 'POST',
        )
        .then((res) => res.json())
        .then((json) => {
          createdIdiom = json.data.idiom;
          console.log('Created idiom ID:', createdIdiom.id);
        }),
      await addIdiomModal.submit(),
    ]);

    await expect(page.getByText(testTitle, { exact: true })).toBeVisible();
    await homePage.clickTableRowWithText(testTitle);

    await detailPage.openEditIdiomModal();

    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes, delete it!' }).click();

    await expect(page.getByText(testTitle)).not.toBeVisible();
  });
});
