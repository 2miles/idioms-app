import { test, expect } from '@playwright/test';
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
