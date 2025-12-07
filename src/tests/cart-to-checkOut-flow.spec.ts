import { test } from "../Fixtures/PomFixture";
import { TestNames } from "../Utils/Testname";
test("Cart to Checkout Flow", async ({login,cart,addProduct,testResultsHandler}) => {
  try {
    await login.loginPage();
    await addProduct.addToCart();
    await cart.completeCheckoutFlow();
    testResultsHandler.addTestResult(TestNames.CheckoutFlowName, "passed");
  } 
  catch (error) {
    testResultsHandler.addTestResult(TestNames.CheckoutFlowName, "failed", error.message);
    throw error; 
  }
});
