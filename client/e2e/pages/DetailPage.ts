import { expect, Locator, Page } from '@playwright/test';

export class DetailPage {
  readonly page: Page;

  readonly displaytitle: Locator;
  readonly timestamp: Locator;
  readonly contributor: Locator;
  readonly definition: Locator;
  readonly examples: Locator;

  readonly editIdiomButton: Locator;
  readonly addExampleButton: Locator;
  readonly editExampleButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.displaytitle = page.getByTestId('displaytitle');
    this.contributor = page.getByTestId('contributor');
    this.definition = page.getByTestId('definition');
    this.examples = page.getByTestId('examples');

    this.editIdiomButton = page.getByRole('button', { name: /edit idiom/i });
    this.addExampleButton = page.getByRole('button', { name: /add ex./i });
    this.editExampleButton = page.getByRole('button', { name: /edit ex./i });
  }

  async goto(id: number | string) {
    await this.page.goto(`/idioms/${id}`);
    await this.displaytitle.waitFor({ state: 'visible' });
  }

  async expectIdiomTitleToBe(title: string) {
    await expect(this.displaytitle).toContainText(title);
  }

  async expectDefinitionToBe(text: string) {
    if (await this.definition.isVisible()) {
      await expect(this.definition).toContainText(text);
    }
  }

  async expectExamplesToInclude(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async expectExamplesToNotInclude(text: string) {
    await expect(this.page.getByText(text)).toHaveCount(0);
  }

  async openUpdateIdiomForm() {
    await this.editIdiomButton.click();
  }

  async openAddExampleForm() {
    await this.addExampleButton.click();
  }

  async openUpdateExamplesForm() {
    await this.editExampleButton.click();
  }
}
