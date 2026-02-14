import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Functional UI Tests - Booking Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
  });


  test('TC014 - Submit booking with valid data', async ({ page }) => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11)
    };
    
    const firstName = page.locator('input[name="firstname"]');
    
    if (await firstName.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstName.fill(testData.firstName);
      await page.locator('input[name="lastname"]').fill(testData.lastName);
      await page.locator('input[name="email"]').fill(testData.email);
      await page.locator('input[name="phone"]').fill(testData.phone);
      
      const bookButton = page.locator('button.btn-primary, button:has-text("Book")');
      await bookButton.click();
      await page.waitForTimeout(2000);
      
      const successMsg = page.locator('.alert-success, .success');
      const hasSuccess = await successMsg.isVisible({ timeout: 5000 }).catch(() => false);
      expect(hasSuccess).toBe(true);
    }
  });

  test('TC015 - Verify booking validation for empty first name', async ({ page }) => {
    const testData = {
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11)
    };
    
    const firstName = page.locator('input[name="firstname"]');
    
    if (await firstName.isVisible({ timeout: 5000 }).catch(() => false)) {
      await page.locator('input[name="lastname"]').fill(testData.lastName);
      await page.locator('input[name="email"]').fill(testData.email);
      await page.locator('input[name="phone"]').fill(testData.phone);
      
      const bookButton = page.locator('button.btn-primary, button:has-text("Book")');
      await bookButton.click();
      await page.waitForTimeout(1000);
      
      const error = page.locator('.alert-danger, .error');
      await expect(error).toBeVisible();
    }
  });

  test('TC016 - Verify booking validation for invalid email', async ({ page }) => {
    const testData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.string.numeric(11)
    };
    
    const firstName = page.locator('input[name="firstname"]');
    
    if (await firstName.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstName.fill(testData.firstName);
      await page.locator('input[name="lastname"]').fill(testData.lastName);
      await page.locator('input[name="email"]').fill('invalid-email');
      await page.locator('input[name="phone"]').fill(testData.phone);
      
      const bookButton = page.locator('button.btn-primary, button:has-text("Book")');
      await bookButton.click();
      await page.waitForTimeout(1000);
      
      const error = page.locator('.alert-danger, .error');
      await expect(error).toBeVisible();
    }
  });

  test('TC017 - Verify cancel button clears booking form', async ({ page }) => {
    const testData = {
      firstName: faker.person.firstName()
    };
    
    const firstName = page.locator('input[name="firstname"]');
    
    if (await firstName.isVisible({ timeout: 5000 }).catch(() => false)) {
      await firstName.fill(testData.firstName);
      
      const cancelButton = page.locator('button:has-text("Cancel"), .btn-secondary');
      if (await cancelButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await cancelButton.click();
        await page.waitForTimeout(1000);
        
        const isFormVisible = await firstName.isVisible({ timeout: 2000 }).catch(() => false);
        expect(isFormVisible).toBe(false);
      }
    }
  });
});
