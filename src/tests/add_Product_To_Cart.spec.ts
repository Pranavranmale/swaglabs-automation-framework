import { test, expect } from '../Fixtures/PomFixture.ts';
import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

type TestFixtures = {
  page: Page;
};

const test = base.extend<TestFixtures>({});

const productName = "Sauce Labs Backpack";

test('Add product to cart and verify Products page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page.getByText('Products')).toBeVisible();

    // Initialize ProductPage
    const productPage = new ProductPage(page, productName);

    // Add product to cart and return to products page
    await productPage.addProductFlow();

    // Verify cart has 1 item
    await productPage.openCart();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);

    // Verify correct product in cart
    await expect(cartItems.first().locator('.inventory_item_name')).toHaveText(productName);
});
