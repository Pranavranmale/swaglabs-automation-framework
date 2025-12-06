import { test } from "../Fixtures/PomFixture";

test("Cart Functionality", async ({ login, cart }) => {
  await login.loginPage();
  await cart.completeCheckoutFlow();   
});
