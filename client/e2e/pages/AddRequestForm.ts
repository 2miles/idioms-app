import { Locator, Page } from '@playwright/test';

export class RequestForm {
  readonly page: Page;
  readonly idiomInput: Locator;
  readonly contributorInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.idiomInput = page.getByRole('textbox', { name: 'Idiom', exact: true });
    this.contributorInput = page.getByRole('textbox', { name: 'Your Name', exact: true });
    this.submitButton = page.getByRole('button', { name: /^submit$/i });
  }

  async fillForm({ title, contributor }: { title: string; contributor?: string }) {
    await this.idiomInput.fill(title);
    if (contributor) {
      await this.contributorInput.fill(contributor);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
