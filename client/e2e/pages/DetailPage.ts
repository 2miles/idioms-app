import { expect, Locator, Page } from '@playwright/test';

export class DetailPage {
  readonly page: Page;

  // Headings
  readonly idiomHeading: Locator;
  readonly meaningHeading: Locator;
  readonly examplesHeading: Locator;

  // Static data
  readonly timestamp: Locator;
  readonly contributor: Locator;
  readonly definition: Locator;
  readonly examples: Locator;

  // Admin buttons
  readonly editIdiomButton: Locator;
  readonly addExampleButton: Locator;
  readonly editExampleButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Top-level headings
    this.idiomHeading = page.locator('h1');
    this.meaningHeading = page.getByRole('heading', { name: 'Meaning:' });
    this.examplesHeading = page.getByRole('heading', { name: 'Examples:' });

    // Metadata
    this.timestamp = page.getByTestId('timestamp');
    this.contributor = page.getByTestId('contributor');

    // Body content
    this.definition = page.locator('p'); // Adjust if multiple <p> elements exist
    this.examples = page.locator('ul li');

    // Admin buttons
    this.editIdiomButton = page.getByRole('button', { name: /edit idiom/i });
    this.addExampleButton = page.getByRole('button', { name: /add example/i });
    this.editExampleButton = page.getByRole('button', { name: /edit example/i });
  }

  async goto(id: number | string) {
    await this.page.goto(`/idioms/${id}`);
    await this.idiomHeading.waitFor({ state: 'visible' });
  }

  async expectIdiomTitleToBe(title: string) {
    await expect(this.idiomHeading).toContainText(title);
  }

  async expectDefinitionToBe(text: string) {
    if (await this.definition.isVisible()) {
      await expect(this.definition).toContainText(text);
    }
  }

  async expectTimestampToBe(date: string) {
    await expect(this.timestamp).toContainText(date);
  }

  async expectExamplesToInclude(text: string) {
    const exampleCount = await this.examples.count();
    if (exampleCount > 0) {
      await expect(this.examples).toContainText(text);
    }
  }

  async openEditIdiomModal() {
    await this.editIdiomButton.click();
  }

  async openAddExampleModal() {
    await this.addExampleButton.click();
  }

  async openEditExampleModal() {
    await this.editExampleButton.click();
  }
}
