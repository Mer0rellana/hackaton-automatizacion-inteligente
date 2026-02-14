import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Functional UI Tests - Admin Panel', () => {

  test('TC018 - Verify admin link is present on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Admin', exact: true })).toBeVisible();
  });

  test('TC019 - Navigate to admin login page', async ({ page }) => {
    await page.goto('/');
    const adminLink = page.getByRole('link', { name: 'Admin', exact: true });
    await adminLink.click();
    await page.waitForTimeout(1000);
    
    await expect(page.locator('input[id="username"]')).toBeVisible();
    await expect(page.locator('input[id="password"]')).toBeVisible();
  });

  test('TC020 - Verify login button is present', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    const loginButton = page.locator('button#doLogin');
    await expect(loginButton).toBeVisible();
  });

  test('TC021 - Login with valid credentials', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    await page.locator('input[id="username"]').fill('admin');
    await page.locator('input[id="password"]').fill('password');
    await page.locator('button#doLogin').click();
    await page.waitForTimeout(2000);
    
    const pageUrl = page.url();
    expect(pageUrl).toContain('admin');
    
    const logoutLink = page.getByRole('button', { name: 'Logout' });

    await expect(logoutLink).toBeVisible();
  });

  test('TC022 - Login with invalid username', async ({ page }) => {
    const invalidUsername = faker.internet.username();

    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    await page.locator('input[id="username"]').fill(invalidUsername);
    await page.locator('input[id="password"]').fill('password');
    await page.locator('button#doLogin').click();
    await page.waitForTimeout(1000);
    
    const error = page.locator('.alert-danger, p:has-text("error")');
    await expect(error).toBeVisible();
  });

  test('TC023 - Login with invalid password', async ({ page }) => {
    const invalidPassword = faker.internet.password();

    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    await page.locator('input[id="username"]').fill('admin');
    await page.locator('input[id="password"]').fill(invalidPassword);
    await page.locator('button#doLogin').click();
    await page.waitForTimeout(1000);
    
    const error = page.locator('.alert-danger, p:has-text("error")');
    await expect(error).toBeVisible();
  });

  test('TC024 - Login with empty username', async ({ page }) => {
    const password = faker.internet.password();

    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    await page.locator('input[id="password"]').fill(password);
    await page.locator('button#doLogin').click();
    await page.waitForTimeout(1000);
    
    const error = page.locator('.alert-danger, p:has-text("error")');
    await expect(error).toBeVisible();
  });

  test('TC025 - Login with empty password', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForTimeout(1000);
    
    await page.locator('input[id="username"]').fill('admin');
    await page.locator('button#doLogin').click();
    await page.waitForTimeout(1000);
    
    const error = page.locator('.alert-danger, p:has-text("error")');
    await expect(error).toBeVisible();
  });
});
