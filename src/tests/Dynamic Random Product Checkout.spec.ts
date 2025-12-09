import { test } from "../Fixtures/PomFixture";
import { TestNames } from "../utils/Testname";
test("Dynamic Random Product Checkout", async ({ login, productCheckoutFlow, testResultsHandler }) => {
  try {
    await login.loginPage();
    const addedProduct = await productCheckoutFlow.addProductToCart();  // <-- Dynamic

    console.log(`Checkout Completed for Product  ${addedProduct}`);
    testResultsHandler.addTestResult(TestNames.CheckoutFlowName, "passed");
  } catch (error) {
    testResultsHandler.addTestResult(TestNames.CheckoutFlowName, "failed", error.message);
    throw error;
  }
});

