import { expect, Locator, Page } from '@playwright/test';

export class UpdateExamplesModal {
  readonly page: Page;

  // General
  readonly modalTitle: Locator;
  readonly saveButton: Locator;
  readonly toast: Locator;

  // Example Inputs
  readonly exampleTextAreas: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;

    this.modalTitle = page.locator('div').filter({ hasText: /edit examples/i });
    this.exampleTextAreas = page.locator('textarea[aria-label^="Edit example"]');
    this.deleteButtons = page.getByRole('button', { name: 'Delete' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.toast = page.locator('.swal2-popup');
  }

  async fillExample(index: number, text: string) {
    await this.exampleTextAreas.nth(index).fill(text);
  }

  async deleteExample(index: number) {
    await this.deleteButtons.nth(index).click();
    await this.page.getByRole('button', { name: /yes, delete it/i }).click();
  }

  async submit() {
    await this.saveButton.click();
  }

  async expectSuccessToast() {
    await expect(this.toast).toContainText('Updated');
  }

  async expectErrorToast() {
    await expect(this.toast).toContainText('Error');
  }

  async expectExampleToContain(index: number, text: string) {
    await expect(this.exampleTextAreas.nth(index)).toHaveValue(text);
  }

  async expectExampleCount(expectedCount: number) {
    await expect(this.exampleTextAreas).toHaveCount(expectedCount);
  }
}
