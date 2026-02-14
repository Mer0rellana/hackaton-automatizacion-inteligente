import { test, expect } from '@playwright/test';

test.describe('Functional UI Tests - Responsive Design', () => {

  test('TC026 - Verify homepage loads on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page).toHaveTitle(/Restful-booker-platform/);
  });

  test('TC027 - Verify navigation menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    const mobileNav = page.locator('nav, header, .navbar');
    await expect(mobileNav.first()).toBeVisible();
  });

  test('TC028 - Verify contact form is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    const nameInput = page.locator('input[data-testid="ContactName"]');
    await expect(nameInput).toBeVisible();
  });


  test('TC029 - Verify images load on different viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 }  // Desktop
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.waitForTimeout(1000);
      
      const images = page.locator('img');
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();
    }
  });
});
