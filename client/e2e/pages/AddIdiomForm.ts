import { Locator, Page } from '@playwright/test';

import { AddIdiomFormData } from '../test-data/idioms';

export class AddIdiomForm {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly titleGeneralInput: Locator;
  readonly definitionInput: Locator;
  readonly contributorInput: Locator;

  readonly keepOpenCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.getByRole('textbox', { name: 'Title', exact: true });
    this.titleGeneralInput = page.getByRole('textbox', { name: 'Title General', exact: true });
    this.definitionInput = page.getByRole('textbox', { name: 'Definition', exact: true });
    this.contributorInput = page.getByRole('textbox', { name: 'Contributor', exact: true });

    this.keepOpenCheckbox = page.getByLabel('Keep Open');
    this.submitButton = page.getByTestId('submit-add-idiom-button');
  }

  async fillForm({ title, titleGeneral, definition, contributor, timestamp }: AddIdiomFormData) {
    await this.titleInput.fill(title);
    if (titleGeneral) await this.titleGeneralInput.fill(titleGeneral);
    if (definition) await this.definitionInput.fill(definition);
    if (contributor) await this.contributorInput.fill(contributor);
  }

  async toggleKeepOpen() {
    await this.keepOpenCheckbox.click();
  }

  async submit() {
    await this.submitButton.click();
  }
}
