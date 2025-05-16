import { expect, Locator, Page } from '@playwright/test';
import { AddIdiomFormData } from '../test-data/idioms';

export class UpdateIdiomModal {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly titleGeneralInput: Locator;
  readonly definitionInput: Locator;
  readonly contributorInput: Locator;
  readonly timestampInput: Locator;

  readonly saveButton: Locator;
  readonly deleteButton: Locator;

  readonly successToast: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.getByLabel('Title');
    this.titleGeneralInput = page.getByLabel('Title General');
    this.definitionInput = page.getByLabel('Definition');
    this.contributorInput = page.getByLabel('Contributor');
    this.timestampInput = page.locator('input[type="datetime-local"]');

    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });

    this.successToast = page.locator('.swal2-popup');
    this.errorToast = page.locator('.swal2-popup');
  }

  async fillForm({ title, titleGeneral, definition, contributor, timestamp }: AddIdiomFormData) {
    await this.titleInput.fill(title);
    if (titleGeneral) await this.titleGeneralInput.fill(titleGeneral);
    if (definition) await this.definitionInput.fill(definition);
    if (contributor) await this.contributorInput.fill(contributor);
    if (timestamp) await this.timestampInput.fill(timestamp);
  }

  async submit() {
    await this.saveButton.click();
  }

  async delete() {
    await this.deleteButton.click();
    // Confirm delete popup in SweetAlert
    await this.page.getByRole('button', { name: /yes, delete it/i }).click();
  }

  async expectSuccessToast() {
    await expect(this.successToast).toContainText('Updated');
  }

  async expectErrorToast() {
    await expect(this.errorToast).toContainText('Error');
  }

  async expectFormToBeVisible() {
    await expect(this.titleInput).toBeVisible();
  }

  async expectFormToBeHidden() {
    await expect(this.titleInput).toBeHidden();
  }
}
