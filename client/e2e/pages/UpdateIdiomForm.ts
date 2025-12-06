import { Locator, Page } from '@playwright/test';

import { AddIdiomFormData } from '../test-data/idioms';

export class UpdateIdiomForm {
  readonly page: Page;

  readonly titleInput: Locator;
  readonly titleGeneralInput: Locator;
  readonly definitionInput: Locator;
  readonly contributorInput: Locator;

  readonly addExampleButton: Locator;
  readonly editExampleButton: Locator;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titleInput = page.getByRole('textbox', { name: 'Title', exact: true });
    this.titleGeneralInput = page.getByRole('textbox', { name: 'Title General', exact: true });
    this.definitionInput = page.getByRole('textbox', { name: 'Definition', exact: true });
    this.contributorInput = page.getByRole('textbox', { name: 'Contributor', exact: true });

    this.addExampleButton = page.getByRole('button', { name: /add example/i });
    this.editExampleButton = page.getByRole('button', { name: /edit examples?/i });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async fillForm({ title, title_general, definition, contributor, timestamp }: AddIdiomFormData) {
    await this.titleInput.fill(title);
    // Clear titleGeneral if it's empty to avoid issues with Playwright
    if (title_general !== undefined && title_general !== null) {
      if (title_general === '') {
        await this.titleGeneralInput.click({ clickCount: 3 });
        await this.titleGeneralInput.press('Backspace');
      } else {
        await this.titleGeneralInput.fill(title_general);
      }
    }
    if (definition) await this.definitionInput.fill(definition);
    if (contributor) await this.contributorInput.fill(contributor);
  }

  async openAddExampleForm() {
    await this.addExampleButton.click();
  }

  async openUpdateExamplesForm() {
    await this.editExampleButton.click();
  }

  async submit() {
    await this.saveButton.click();
  }

  async delete() {
    await this.deleteButton.click();
    await this.page.getByRole('button', { name: 'Yes, delete it!' }).click();
  }
}
