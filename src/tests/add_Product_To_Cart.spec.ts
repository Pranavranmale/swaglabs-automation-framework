import { test, expect } from '../Fixtures/PomFixture.ts';
import * as dotenv from 'dotenv';
import { AddProduct } from '../PageObject/addProduct.ts';

dotenv.config();

const productName = "Sauce Labs Backpack";

test('Add product to cart and verify Products page', async ({ page, login, addProduct }) => {

    // Login
    await login.loginPage();

    // Add product to cart and return to products page
    await addProduct.addProductFlow();

    // Verify cart has 1 item
    await addProduct.openCart();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);

    // Verify correct product in cart
    await expect(cartItems.first().locator('.inventory_item_name')).toHaveText(productName);
    await page.waitForTimeout(2000);
});
