import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

import { ADD_IDIOM_INPUT, EDIT_IDIOM_INPUT } from '../test-data/idioms.js';
import { HomePage } from '../pages/HomePage.js';
import { DetailPage } from '../pages/DetailPage.js';
import { AddIdiomModal } from '../pages/AddIdiomModal.js';
import { UpdateIdiomModal } from '../pages/UpdateIdiomModal.js';

test.use({ storageState: './e2e/.auth/admin.json' });

test.describe('Admin: Idiom management', () => {
  test('can add, edit, and delete an idiom and its examples', async ({ page }) => {
    const homePage = new HomePage(page);
    const detailPage = new DetailPage(page);
    const addIdiomModal = new AddIdiomModal(page);
    const updateIdiomModal = new UpdateIdiomModal(page);

    const testTitle = `${ADD_IDIOM_INPUT.title} ${randomUUID().slice(0, 8)}`;

    // Navigate to the homepage
    await homePage.goTo();

    // Open and fill the Add Idiom modal
    await homePage.openAddIdiomModal();
    await addIdiomModal.fillForm({
      title: testTitle,
      titleGeneral: ADD_IDIOM_INPUT.title_general ?? '',
      definition: ADD_IDIOM_INPUT.definition ?? '',
      contributor: ADD_IDIOM_INPUT.contributor ?? '',
    });

    // Submit and wait for idioms to reload
    await addIdiomModal.submit();
    await page.waitForLoadState('networkidle');

    // Verify idiom was added
    await expect(page.getByText(testTitle, { exact: true })).toBeVisible({ timeout: 10000 });

    // Navigate to detail page
    await homePage.clickTableRowWithText(testTitle);

    // Replace beginning of original title with EDIT_IDIOM_FORM_DATA_1.title to preserve UUID suffix
    const newTestTitle = `${EDIT_IDIOM_INPUT.title}${testTitle.slice(
      ADD_IDIOM_INPUT.title!.length,
    )}`;

    // Edit idiom fields
    await detailPage.openUpdateIdiomModal();
    await updateIdiomModal.fillForm({
      title: newTestTitle,
      titleGeneral: EDIT_IDIOM_INPUT.title_general ?? '',
      definition: EDIT_IDIOM_INPUT.definition ?? '',
      contributor: EDIT_IDIOM_INPUT.contributor ?? '',
    });

    // Submit the update
    await updateIdiomModal.submit();

    // Verify detail page shows updated idiom data
    await detailPage.expectIdiomTitleToBe(newTestTitle);
    await detailPage.expectDefinitionToBe(EDIT_IDIOM_INPUT.definition!);

    // TODO:
    // Open AddExampleModal and add example sentences
    // Verify examples appear on detail page
    // Open UpdateExamplesModal and edit example sentences
    // Verify edited examples appear correctly
    // Open UpdateExamplesModal and delete an example
    // Verify example was removed

    // Delete the idiom
    await detailPage.openUpdateIdiomModal();
    await updateIdiomModal.delete();
    await expect(page.getByText(testTitle)).not.toBeVisible();
  });
});
