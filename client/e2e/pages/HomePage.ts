// // e2e/pages/HomePage.ts
import { Locator, Page, expect } from '@playwright/test';
export class HomePage {
  readonly page: Page;
  readonly addIdiomButton: Locator;
  readonly tableRows: Locator;
  readonly showingText: Locator;
  readonly itemsPerPageDropdown: Locator;
  readonly itemsPerPageOption10: Locator;

  constructor(page: Page) {
    this.page = page;

    // this.addIdiomButton = page.getByRole('button', { name: /add/i });
    this.addIdiomButton = page.getByTestId('open-add-idiom-button');
    this.tableRows = page.locator('table tbody tr');
    this.showingText = page.locator('p', { hasText: /of \d+ idioms/i });
    this.itemsPerPageDropdown = page.locator('button', { hasText: /items per page/i });
    this.itemsPerPageOption10 = page.getByRole('option', { name: /^10$/ });
  }

  get nextPageButton() {
    return this.page.getByRole('link', { name: /next page/i }).first();
  }

  get previousPageButton() {
    return this.page.getByRole('link', { name: /previous page/i }).first();
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
    await locator.waitFor({ timeout: 10000 });
    await expect(locator).toBeVisible({ timeout: 10000 });
    await locator.click();
  }

  async goToNextPage() {
    await expect(this.nextPageButton).toBeVisible({ timeout: 3000 });
    await this.nextPageButton.click();
  }

  async goToPreviousPage() {
    await expect(this.previousPageButton).toBeVisible({ timeout: 3000 });
    await this.previousPageButton.click();
  }

  async changeItemsPerPageTo10() {
    await this.itemsPerPageDropdown.click();
    await this.itemsPerPageOption10.click();
  }
}
