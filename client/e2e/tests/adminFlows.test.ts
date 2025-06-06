import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

import { Idiom } from '../../src/types.js';
import { ADD_IDIOM_FORM_DATA_1 } from '../test-data/idioms.js';
import { HomePage } from '../pages/HomePage.js';
import { DetailPage } from '../pages/DetailPage.js';
import { AddIdiomModal } from '../pages/AddIdiomModal.js';

test.use({ storageState: './e2e/.auth/admin.json' });

test.describe('Admin: Idiom management', () => {
  test('can add and delete an idiom', async ({ page }) => {
    const homePage = new HomePage(page);
    const detailPage = new DetailPage(page);
    const addIdiomModal = new AddIdiomModal(page);

    let createdIdiom: Idiom;

    const testTitle = `${ADD_IDIOM_FORM_DATA_1.title} ${randomUUID().slice(0, 8)}`;

    await homePage.goTo();

    await homePage.openAddIdiomModal();

    await addIdiomModal.fillForm({
      title: testTitle,
      titleGeneral: ADD_IDIOM_FORM_DATA_1.title_general ?? '',
      definition: ADD_IDIOM_FORM_DATA_1.definition ?? '',
      contributor: ADD_IDIOM_FORM_DATA_1.contributor ?? '',
    });

    const waitForPost = page
      .waitForResponse(
        (res) => res.url().includes('/api/v1/idioms') && res.request().method() === 'POST',
      )
      .then((res) => res.json());
    const submitForm = addIdiomModal.submit();
    const [json] = await Promise.all([waitForPost, submitForm]);
    createdIdiom = json.data.idiom;
    console.log('Created idiom ID:', createdIdiom.id);

    await expect(page.getByText(testTitle, { exact: true })).toBeVisible();
    await homePage.clickTableRowWithText(testTitle);

    await detailPage.openEditIdiomModal();

    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes, delete it!' }).click();

    await expect(page.getByText(testTitle)).not.toBeVisible();
  });
});
