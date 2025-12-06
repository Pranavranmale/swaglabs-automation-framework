import { test } from "../Fixtures/PomFixture";
test("Cart to Checkout Flow", async ({ login, cart, addProduct }) => {
  await login.loginPage();
  await addProduct.addToCart();
  await cart.completeCheckoutFlow();   
});