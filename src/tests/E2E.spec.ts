// tests/e2e.spec.ts
import { test, expect } from '../Fixtures/PomFixture.ts';

test.describe('SauceDemo Full E2E Flow', () => {
  
  test('Complete purchase flow', async ({  login, dropdown, cart, addProduct }) => {

          // Login
          await login.loginPage();

          // Sort products
          await dropdown.selectSort('az');

          // Add product to cart
          const products = await dropdown.getProducts();
          await addProduct.addToCart();
          await addProduct.openCart();

          // Validate success page
          await cart.completeCheckoutFlow();

          const successText = await cart.getSuccessText();
          expect(successText).toContain("Thank you for your order!");
      });

});
