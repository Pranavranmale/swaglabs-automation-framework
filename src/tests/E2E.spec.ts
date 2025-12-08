// tests/e2e.spec.ts
import { test, expect } from '../Fixtures/PomFixture'
import { TestNames } from '../utils/Testname';

test('Complete purchase flow', async ({ login, dropdown, addProduct, productCheckoutFlow, testResultsHandler }) => {
  try {
    // Step 1: Login
    await login.loginPage();
    
    // Step 2: Sort Products (A → Z)
    await dropdown.selectSort('az');

    // Step 3: Verify + Checkout + Finish
    const orderText = await productCheckoutFlow.completeCheckoutFlow();

    // Step 4: Assertion
    expect(orderText).toBe("Thank you for your order!");

    testResultsHandler.addTestResult(TestNames.E2ETestName, "passed");

  } catch (error: any) {
    testResultsHandler.addTestResult(TestNames.E2ETestName, "failed", error.message);
    throw error;
  }
});
