// e2e/pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly addIdiomButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addIdiomButton = page.getByRole('button', { name: /add idiom/i });
    this.tableRows = page.locator('table tbody tr');
  }

  async goTo() {
    await this.page.goto('/');
  }

  async waitForLoad() {
    await expect(async () => {
      const rowCount = await this.tableRows.count();
      expect(rowCount).toBeGreaterThan(1);
    }).toPass({ timeout: 5000 });
  }

  async openAddIdiomForm() {
    await this.addIdiomButton.click();
  }

  async clickTableRowWithText(text: string) {
    const locator = this.page.getByRole('cell', { name: text, exact: true });
    await locator.waitFor({ timeout: 10000 }); // ensures it's in DOM
    await expect(locator).toBeVisible({ timeout: 10000 }); // ensures it's painted
    await locator.click();
  }
}
