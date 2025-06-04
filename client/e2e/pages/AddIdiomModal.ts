import { expect, Locator, Page } from '@playwright/test';
import { AddIdiomFormData } from '../test-data/idioms';

export class AddIdiomModal {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly titleGeneralInput: Locator;
  readonly definitionInput: Locator;
  readonly contributorInput: Locator;
  readonly timestampInput: Locator;

  readonly keepOpenCheckbox: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.getByRole('textbox', { name: 'Title', exact: true });
    this.titleGeneralInput = page.getByRole('textbox', { name: 'Title General', exact: true });
    this.definitionInput = page.getByRole('textbox', { name: 'Definition', exact: true });
    this.contributorInput = page.getByRole('textbox', { name: 'Contributor', exact: true });
    // this.timestampInput = page.locator('input[type="datetime-local"]');

    this.keepOpenCheckbox = page.getByLabel('Keep Open');
    this.submitButton = page.getByRole('button', { name: /^add$/i });
    this.closeButton = page.getByRole('button', { name: /×/ });

    this.toast = page.locator('.swal2-popup');
  }

  async fillForm({ title, titleGeneral, definition, contributor, timestamp }: AddIdiomFormData) {
    await this.titleInput.fill(title);
    if (titleGeneral) await this.titleGeneralInput.fill(titleGeneral);
    if (definition) await this.definitionInput.fill(definition);
    if (contributor) await this.contributorInput.fill(contributor);
    if (timestamp) await this.timestampInput.fill(timestamp);
  }

  async toggleKeepOpen() {
    await this.keepOpenCheckbox.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectModalToBeVisible() {
    await expect(this.titleInput).toBeVisible();
  }

  async expectModalToClose() {
    await expect(this.titleInput).toBeHidden();
  }

  async expectSuccessToast() {
    await expect(this.toast).toContainText('Idiom Added');
  }

  async expectErrorToast() {
    await expect(this.toast).toContainText('Error');
  }

  async close() {
    await this.closeButton.click();
    await expect(this.titleInput).toBeHidden(); // or use modal title if more stable
  }
}
