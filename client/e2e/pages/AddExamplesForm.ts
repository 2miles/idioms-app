import { Locator, Page } from '@playwright/test';

export class AddExampleForm {
  readonly page: Page;
  readonly newExampleTextarea: Locator;
  readonly keepOpenCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newExampleTextarea = page.getByLabel('New Example', { exact: true });
    this.keepOpenCheckbox = page.getByLabel('Keep Open');
    this.submitButton = page.getByRole('button', { name: /^add$/i });
  }

  async fillForm(exampleText: string) {
    await this.newExampleTextarea.fill(exampleText);
  }

  async toggleKeepOpen() {
    await this.keepOpenCheckbox.click();
  }

  async submit() {
    await this.submitButton.click();
  }
}
