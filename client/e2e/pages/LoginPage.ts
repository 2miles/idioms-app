import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async login(email: string, password: string) {
    await this.page.goto('http://localhost:5174');
    await this.page.getByRole('button', { name: 'Log In' }).click();
    await this.page.waitForURL(/auth0\.com/);

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
