import { test } from "../Fixtures/PomFixture";
import { CheckoutFlowName } from '../Utils/handalResults';
test("Cart to Checkout Flow", async ({login,cart,addProduct,testResultsHandler,}) => {
  try {
    await login.loginPage();
    await addProduct.addToCart();
    await cart.completeCheckoutFlow();
    testResultsHandler.addTestResult(CheckoutFlowName, "passed");
  } 
  catch (error) {
    testResultsHandler.addTestResult(CheckoutFlowName, "failed", error.message);
    throw error;
  }
});
