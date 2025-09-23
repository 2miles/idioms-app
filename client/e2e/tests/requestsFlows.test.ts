import { test } from '@playwright/test';
import { RequestForm } from '../pages/AddRequestForm';
import { HomePage } from '../pages/HomePage';
import { RequestsPage } from '../pages/RequestsPage';

test.describe('User, Admin: Request Submission', () => {
  test('User can submit request and Admin sees it', async ({ browser }) => {
    const title = `Cross-role request ${Date.now()}`;

    // User submits a request
    const userContext = await browser.newContext({ storageState: './e2e/.auth/user.json' });
    const userPage = await userContext.newPage();
    const home = new HomePage(userPage);
    const requestForm = new RequestForm(userPage);

    await home.goTo();
    await home.openRequestForm();
    await requestForm.fillForm({ title, contributor: 'Miles' });
    await requestForm.submit();
    await userContext.close();

    // Admin workflow
    const adminContext = await browser.newContext({ storageState: './e2e/.auth/admin.json' });
    const adminPage = await adminContext.newPage();
    const requestsPage = new RequestsPage(adminPage);

    // Go to Requests page and see the new request
    await requestsPage.goTo();
    await requestsPage.expectRequestVisible(title);

    // Mark as added and confirm
    await requestsPage.markRequestAsAdded(title);
    await requestsPage.expectRequestMarkedAsAdded(title);

    // Delete the request and confirm deletion
    await requestsPage.clickDeleteButtonFor(title);
    await requestsPage.confirmDeleteIfVisible();
    await requestsPage.expectRequestNotVisible(title);

    await adminContext.close();
  });
});
