import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe('Functional UI Tests - Contact Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
  });

  test('TC007 - Verify all contact form fields are visible', async ({ page }) => {
    await expect(page.locator('input[data-testid="ContactName"]')).toBeVisible();
    await expect(page.locator('input[data-testid="ContactEmail"]')).toBeVisible();
    await expect(page.locator('input[data-testid="ContactPhone"]')).toBeVisible();
    await expect(page.locator('input[data-testid="ContactSubject"]')).toBeVisible();
    await expect(page.locator('textarea[data-testid="ContactDescription"]')).toBeVisible();
  });


  test('TC008 - Submit contact form with valid data', async ({ page }) => {
    const testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11),
      subject: faker.lorem.words(3),
      message: faker.lorem.sentence(10)
    };

    await page.locator('input[data-testid="ContactName"]').fill(testData.name);
    await page.locator('input[data-testid="ContactEmail"]').fill(testData.email);
    await page.locator('input[data-testid="ContactPhone"]').fill(testData.phone);
    await page.locator('input[data-testid="ContactSubject"]').fill(testData.subject);
    await page.locator('textarea[data-testid="ContactDescription"]').fill(testData.message);

    await page.getByText('Submit').click();
    await page.waitForTimeout(2000);

    await expect(page.locator('#contact')).toContainText(`Thanks for getting in touch ${testData.name}!`);

  });

  test('TC009 - Verify name field validation', async ({ page }) => {
    const testData = {
      email: faker.internet.email(),
      phone: faker.string.numeric(11),
      subject: faker.lorem.words(3),
      message: faker.lorem.sentence()
    };

    await page.locator('input[data-testid="ContactEmail"]').fill(testData.email);
    await page.locator('input[data-testid="ContactPhone"]').fill(testData.phone);
    await page.locator('input[data-testid="ContactSubject"]').fill(testData.subject);
    await page.locator('textarea[data-testid="ContactDescription"]').fill(testData.message);

    await page.getByText('Submit').click();
    await page.waitForTimeout(1000);

    const alertError = page.locator('.alert-danger');
    await expect(alertError).toBeVisible();
  });

  test('TC010 - Verify email field validation', async ({ page }) => {
    const testData = {
      name: faker.person.fullName(),
      phone: faker.string.numeric(11),
      subject: faker.lorem.words(3),
      message: faker.lorem.sentence()
    };

    await page.locator('input[data-testid="ContactName"]').fill(testData.name);
    await page.locator('input[data-testid="ContactEmail"]').fill('invalid-email');
    await page.locator('input[data-testid="ContactPhone"]').fill(testData.phone);
    await page.locator('input[data-testid="ContactSubject"]').fill(testData.subject);
    await page.locator('textarea[data-testid="ContactDescription"]').fill(testData.message);

    await page.getByText('Submit').click();
    await page.waitForTimeout(1000);

    const alertError = page.locator('.alert-danger');
    await expect(alertError).toBeVisible();
  });

  test('TC011 - Verify phone field validation', async ({ page }) => {
    const testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.words(3),
      message: faker.lorem.sentence()
    };

    await page.locator('input[data-testid="ContactName"]').fill(testData.name);
    await page.locator('input[data-testid="ContactEmail"]').fill(testData.email);
    await page.locator('input[data-testid="ContactPhone"]').fill('123'); // Too short
    await page.locator('input[data-testid="ContactSubject"]').fill(testData.subject);
    await page.locator('textarea[data-testid="ContactDescription"]').fill(testData.message);

    await page.getByText('Submit').click();
    await page.waitForTimeout(1000);

    const alertError = page.locator('.alert-danger');
    await expect(alertError).toBeVisible();
  });

  test('TC012 - Verify subject field validation', async ({ page }) => {
    const testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11),
      message: faker.lorem.sentence()
    };

    await page.locator('input[data-testid="ContactName"]').fill(testData.name);
    await page.locator('input[data-testid="ContactEmail"]').fill(testData.email);
    await page.locator('input[data-testid="ContactPhone"]').fill(testData.phone);
    await page.locator('textarea[data-testid="ContactDescription"]').fill(testData.message);

    await page.getByText('Submit').click();
    await page.waitForTimeout(1000);

    const alertError = page.locator('.alert-danger');
    await expect(alertError).toBeVisible();
  });

  test('TC013 - Verify description field validation', async ({ page }) => {
    const testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.string.numeric(11),
      subject: faker.lorem.words(3)
    };

    await page.locator('input[data-testid="ContactName"]').fill(testData.name);
    await page.locator('input[data-testid="ContactEmail"]').fill(testData.email);
    await page.locator('input[data-testid="ContactPhone"]').fill(testData.phone);
    await page.locator('input[data-testid="ContactSubject"]').fill(testData.subject);

    await page.getByText('Submit').click();
    await page.waitForTimeout(1000);

    const alertError = page.locator('.alert-danger');
    await expect(alertError).toBeVisible();
  });
});
