import { expect, test } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

test.describe('Public: Visit Homepage', () => {
  test('loads idioms table on homepage', async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();
    await home.waitForLoad(); // wait for idioms to load

    const rowCount = await home.tableRows.count();
    expect(rowCount).toBeGreaterThan(1);
  });
});

test.describe('Public: Pagination on Homepage', () => {
  test('navigates idiom pages with correct range text and disabled nav buttons', async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.goTo();
    await home.waitForLoad();

    // Expect the first page to have the correct 'showing text'
    const firstRowText = await home.tableRows.first().textContent();
    await expect(home.showingText).toHaveText(/^1–20 of \d+ idioms$/);

    // Expect back button to be disabled on the first page
    const prevPageButton = page.getByRole('link', { name: 'Previous page' }).first();
    const liPrev = prevPageButton.locator('..');
    await expect(liPrev).toHaveClass(/disabled/);

    // Go to next page and expect it to have the correct 'showing text' and different first row
    await home.goToNextPage();
    await expect(home.tableRows.first()).not.toHaveText(firstRowText ?? '');
    await expect(home.showingText).toHaveText(/^21–40 of \d+ idioms$/);
    await home.goToPreviousPage();
    await expect(home.tableRows.first()).toHaveText(firstRowText ?? '');

    // Go to the last page
    const pageButtons = page.getByRole('link', { name: /^Go to page \d+$/ });
    await pageButtons.last().click();

    // Expect forward button to be disabled on the last page
    const nextPageButton = page.getByRole('link', { name: 'Next page' }).first();
    const liNext = nextPageButton.locator('..');
    await expect(liNext).toHaveClass(/disabled/);
  });

  test('updates rows, showing text, and pagination when items per page changes', async ({
    page,
  }) => {
    const home = new HomePage(page);

    await home.goTo();
    await home.waitForLoad();

    // Capture the last visible page number before changing items per page
    const pageButtons = page.getByRole('link', { name: /^Go to page \d+$/ });
    const originalLastPageNumber = await pageButtons.last().textContent();

    // Open the dropdown and change to 50 items per page
    const dropdownButton = page.getByRole('button', { name: 'Items per page' });
    await dropdownButton.click();
    const option50 = page.getByRole('option', { name: '50' });
    await option50.click();

    // Expect 50 rows to be rendered
    await expect(async () => {
      const newCount = await home.tableRows.count();
      expect(newCount).toBe(50);
    }).toPass({ timeout: 3000 });

    // Expect showing text to update accordingly
    await expect(home.showingText).toHaveText(/^1–50 of \d+ idioms$/);

    // Expect last page number to change due to different pagination size
    const newLastPageNumber = await pageButtons.last().textContent();
    await expect(newLastPageNumber).not.toBe(originalLastPageNumber);

    // Change back to 20 items per page
    await dropdownButton.click();
    const option20 = page.getByRole('option', { name: '20' });
    await option20.click();

    // Expect 20 rows and showing text to update again
    await expect(async () => {
      const newCount = await home.tableRows.count();
      expect(newCount).toBe(20);
    }).toPass({ timeout: 3000 });
    await expect(home.showingText).toHaveText(/^1–20 of \d+ idioms$/);
  });
});
