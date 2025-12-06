// tests/e2e.spec.ts
import { test, expect } from '../Fixtures/PomFixture';
import { TestResultsHandler } from '../utils/testResultsHandler';
import dotenv from "dotenv";
dotenv.config();

test.describe('SauceDemo Full E2E Flow', () => {
  
  test('Complete purchase flow', async ({ page, login, dropdown, addProduct, cart }) => {

          // Login
          await page.goto(baseURL);
          await login.loginPage();

          // Sort products
          await dropdown.getProducts();

          // Add product
          await addProduct.selectSort('az');

          // Go to Cart and Checkout
          await cart.checkout('Pranav', 'Ranmale', '411001');

          // Validate success page
          const successText = await cart.getSuccessText();
          expect(successText).toContain('THANK YOU');
      });

});
