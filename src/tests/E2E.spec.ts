// tests/e2e.spec.ts
import { test, expect } from '../Fixtures/PomFixture'
import { E2ETestName } from '../Utils/TestNames';
  
  test('Complete purchase flow', async ({  login, dropdown, cart, addProduct,testResultsHandler }) => {
         try{
           // Login
          await login.loginPage();

          // Sort products
          await dropdown.selectSort('az');

          // Add product to cart
          await dropdown.getProducts();
          await addProduct.addToCart();
          await addProduct.openCart();

          // Validate success page
          await cart.completeCheckoutFlow();

          const successText = await cart.getSuccessText();
          expect(successText).toContain("Thank you for your order!");

           testResultsHandler.addTestResult(E2ETestName, "passed");
         }
          catch(error){
             testResultsHandler.addTestResult(E2ETestName, "failed", error.message); 
             throw error;
          }
      });