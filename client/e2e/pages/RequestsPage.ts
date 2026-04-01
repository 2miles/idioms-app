import { Locator, Page, expect } from '@playwright/test';

export class RequestsPage {
  readonly page: Page;
  readonly emptyMessage: Locator;
  readonly requestCards: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: /requests/i });
    this.emptyMessage = page.getByText(/no idioms have been requested yet/i);
    this.requestCards = page.locator('.card');
  }

  async goTo() {
    await this.page.goto('/requests');
    await expect(this.pageTitle).toBeVisible({ timeout: 5000 });
  }

  getRequestCard(title: string) {
    return this.page.locator('.card', { hasText: title });
  }

  async expectRequestVisible(title: string) {
    await expect(this.page.getByText(title, { exact: true })).toBeVisible({ timeout: 10000 });
  }

  async expectRequestNotVisible(title: string) {
    await expect(this.page.getByText(title, { exact: true })).not.toBeVisible({ timeout: 5000 });
  }

  async expectNoRequestsMessage() {
    await expect(this.emptyMessage).toBeVisible();
  }

  async clickAddButtonFor(title: string) {
    const card = this.getRequestCard(title);
    await card.getByRole('button', { name: /^add$/i }).click();
  }

  async clickTestButtonFor(title: string) {
    const card = this.getRequestCard(title);
    await card.getByRole('button', { name: /^test$/i }).click();
  }

  async expectRequestMarkedAsAdded(title: string) {
    const card = this.getRequestCard(title);

    await expect(card.getByRole('button', { name: /^add$/i })).toHaveCount(0);
    await expect(card.getByRole('button', { name: /^test$/i })).toHaveCount(0);
    await expect(card.getByRole('button', { name: /^delete$/i })).toBeVisible();

    const checkIcon = card.locator('svg');
    await expect(checkIcon).toBeVisible();
  }

  async clickDeleteButtonFor(title: string) {
    const card = this.getRequestCard(title);
    await card.getByRole('button', { name: /^(reject|delete)$/i }).click();
  }

  async confirmDeleteIfVisible() {
    const confirm = this.page.getByRole('button', { name: /^yes, delete it!$/i });
    if (await confirm.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirm.click();
    }
  }
}
