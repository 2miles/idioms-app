// e2e/pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // --- NavBar Controls ---
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  // Add Idiom
  readonly addIdiomButton: Locator;

  // Search Controls
  readonly searchInput: Locator;
  readonly searchColumnDropdown: Locator;

  // Table Controls
  readonly columnVisibilityButton: Locator;
  readonly itemsPerPageDropdown: Locator;
  readonly paginationNextButton: Locator;
  readonly paginationPreviousButton: Locator;

  // Table Content
  readonly tableRows: Locator;

  // Miscellaneous
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole('button', { name: /log in/i });
    this.logoutButton = page.getByRole('button', { name: /log out/i });

    // Add Idiom
    this.addIdiomButton = page.getByRole('button', { name: /add idiom/i });

    // Search
    this.searchInput = page.getByPlaceholder('Search...');
    this.searchColumnDropdown = page.getByTestId('search-column-dropdown'); // Add data-testid if needed

    // Table Controls
    this.columnVisibilityButton = page.getByRole('button', { name: /columns/i });
    this.itemsPerPageDropdown = page.getByRole('button', { name: /items per page/i });
    this.paginationNextButton = page.getByRole('link', { name: '>' }).first();
    this.paginationPreviousButton = page.getByRole('link', { name: '<' }).first();

    // Table Content
    this.tableRows = page.locator('table tbody tr');

    // Miscellaneous
    this.noResultsMessage = page.getByText('No Idioms Found');
  }

  async goTo() {
    await this.page.goto('/');
  }

  async waitForLoad(minRows = 2) {
    await this.page.waitForFunction(
      (min) => document.querySelectorAll('table tbody tr').length >= min,
      minRows,
    );
  }

  // --- NavBar Actions ---
  async login() {
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
  // --- Add Idiom Actions ---
  async openAddIdiomModal() {
    await this.addIdiomButton.click();
  }

  // --- Search Actions ---
  async selectSearchColumn(columnLabel: string) {
    await this.searchColumnDropdown.selectOption(columnLabel);
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
  }

  // component tsx
  // data-testid={`table-header-${accessor}`}
  getTableHeader(header: string) {
    return this.page.getByTestId(`table-header-${header}`);
  }

  async sortBy(header: string) {
    await this.getTableHeader(header).click();
  }

  async sortByTitle() {
    await this.getTableHeader('title').click();
  }

  async sortByPosition() {
    await this.getTableHeader('position').click();
  }

  async clickTableRow(rowIndex: number) {
    await this.tableRows.nth(rowIndex).click();
  }

  async clickTableRowWithText(text: string) {
    const locator = this.page.getByRole('cell', { name: text, exact: true });

    await locator.waitFor({ timeout: 10000 }); // ensures it's in DOM
    await expect(locator).toBeVisible({ timeout: 10000 }); // ensures it's painted
    await locator.click();
  }

  async clickNextPage() {
    await this.paginationNextButton.click();
  }

  async clickPreviousPage() {
    await this.paginationPreviousButton.click();
  }

  async toggleColumn(columnLabel: string) {
    await this.columnVisibilityButton.click();
    const checkbox = this.page.getByLabel(columnLabel);
    await checkbox.click();
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible();
  }
}
