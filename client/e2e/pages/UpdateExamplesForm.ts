import { expect, Locator, Page } from '@playwright/test';

export class UpdateExamplesForm {
  readonly page: Page;

  readonly exampleTextAreas: Locator;
  readonly saveButton: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;

    this.exampleTextAreas = page.locator('textarea[aria-label^="Edit example"]');
    this.deleteButtons = page.getByRole('button', { name: 'Delete' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
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

  async expectExampleToContain(index: number, text: string) {
    await expect(this.exampleTextAreas.nth(index)).toHaveValue(text);
  }
}
