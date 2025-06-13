import { test, expect } from '@playwright/test';
import { randomUUID } from 'crypto';

import { AddExampleForm } from '../pages/AddExamplesForm.js';
import { AddIdiomForm } from '../pages/AddIdiomForm.js';
import { DetailPage } from '../pages/DetailPage.js';
import { HomePage } from '../pages/HomePage.js';
import { UpdateExamplesForm } from '../pages/UpdateExamplesForm.js';
import { UpdateIdiomForm } from '../pages/UpdateIdiomForm.js';

import { TEST_IDIOM, EDITED_IDIOM, TEST_EXAMPLES, EDITED_EXAMPLES } from '../test-data/idioms.js';

test.use({ storageState: './e2e/.auth/admin.json' });

test.describe('Admin: Idiom management', () => {
  test('can add, edit, and delete an idiom and its examples', async ({ page }) => {
    const addExampleForm = new AddExampleForm(page);
    const addIdiomForm = new AddIdiomForm(page);
    const detailPage = new DetailPage(page);
    const homePage = new HomePage(page);
    const updateExamplesForm = new UpdateExamplesForm(page);
    const updateIdiomForm = new UpdateIdiomForm(page);

    const testTitle = `${TEST_IDIOM.title} ${randomUUID().slice(0, 8)}`;

    //Add Idiom and verify it appears in the home page table
    await homePage.goTo();
    await homePage.openAddIdiomForm();
    await addIdiomForm.fillForm({
      title: testTitle,
      titleGeneral: TEST_IDIOM.title_general ?? '',
      definition: TEST_IDIOM.definition ?? '',
      contributor: TEST_IDIOM.contributor ?? '',
    });
    await addIdiomForm.submit();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(testTitle, { exact: true })).toBeVisible({ timeout: 10000 });

    // Replace beginning of original title with new title preserving UUID suffix
    const newTestTitle = `${EDITED_IDIOM.title}${testTitle.slice(TEST_IDIOM.title!.length)}`;

    // Navigate to detail page, edit idiom, verify changes
    await homePage.clickTableRowWithText(testTitle);
    await detailPage.openUpdateIdiomForm();
    await updateIdiomForm.fillForm({
      title: newTestTitle,
      titleGeneral: EDITED_IDIOM.title_general ?? '',
      definition: EDITED_IDIOM.definition ?? '',
      contributor: EDITED_IDIOM.contributor ?? '',
    });
    await updateIdiomForm.submit();
    await detailPage.expectIdiomTitleToBe(newTestTitle);
    await detailPage.expectDefinitionToBe(EDITED_IDIOM.definition!);

    // Add two example sentences and verify they appear on detail page
    await detailPage.openAddExampleForm();
    await addExampleForm.fillForm(TEST_EXAMPLES[0]);
    await addExampleForm.toggleKeepOpen();
    await addExampleForm.submit();

    // TODO: Rplace arbitrary wait with a more robust solution
    await page.waitForTimeout(1000); // allow form reset/re-render
    await addExampleForm.fillForm(TEST_EXAMPLES[1]);
    await addExampleForm.toggleKeepOpen();
    await addExampleForm.submit();

    await detailPage.expectExamplesToInclude(TEST_EXAMPLES[1]);
    await detailPage.expectExamplesToInclude(TEST_EXAMPLES[2]);

    // Edit example sentences and verify changes
    await detailPage.openUpdateExamplesForm();
    await updateExamplesForm.fillExample(0, EDITED_EXAMPLES[1]);
    await updateExamplesForm.fillExample(1, EDITED_EXAMPLES[2]);
    await updateExamplesForm.submit();

    await detailPage.expectExamplesToInclude(EDITED_EXAMPLES[1]);
    await detailPage.expectExamplesToInclude(EDITED_EXAMPLES[2]);

    // Delete the first example and verify it was removed
    await detailPage.openUpdateExamplesForm();
    await updateExamplesForm.deleteExample(0);
    await updateExamplesForm.submit();
    await detailPage.expectExamplesToNotInclude(EDITED_EXAMPLES[1]);

    // Delete the idiom
    await detailPage.openUpdateIdiomForm();
    await updateIdiomForm.delete();
    await expect(page.getByText(newTestTitle)).not.toBeVisible();
  });
});
