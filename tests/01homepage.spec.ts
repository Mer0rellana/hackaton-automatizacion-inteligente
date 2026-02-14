import test, { expect } from "@playwright/test";


test.describe('Functional UI Tests - Homepage', () => {
  
  test('TC001 - Verify homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Restful-booker-platform/);
  });

  test('TC002 - Verify hotel logo is displayed', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('img').first();
    await expect(logo).toBeVisible();
  });

  test('TC003 - Verify hotel description is visible', async ({ page }) => {
    await page.goto('/');
    const description = page.locator('p').first();
    await expect(description).toBeVisible();
  });

  test('TC004 - Verify contact section exists', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    const contactHeading = page.getByText('Contact', { exact: false }).first();
    await expect(contactHeading).toBeVisible();
  });

  test('TC005 - Verify room information is displayed', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    const roomElements = page.locator('[class*="room"]');
    await expect(roomElements.first()).toBeVisible();
  });

  test('TC006 - Verify booking calendar is present', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    await page.getByRole('textbox').first().click();
    const calendar = page.locator('.react-datepicker__month-container');
    await expect(calendar).toBeVisible();
  });
});
