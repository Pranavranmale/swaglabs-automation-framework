   import { test } from '../Fixtures/PomFixture';
   test('Cart Functionality', async ({ page, login, cart }) => {
        await login.login();  // Login first
        await cart.addProduct();
        await page.waitForTimeout(2000);
        await cart.formDetails();   
        await page.waitForTimeout(2000);
        await cart.checkout();
        await page.waitForTimeout(2000);
});