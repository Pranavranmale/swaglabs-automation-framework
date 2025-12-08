import { Page, Locator, expect } from "@playwright/test";
import { formData } from "../Types/Types";

export class ProductCheckoutFlow {

  readonly page: Page;

  // Locators
  readonly productsName: Locator;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;
  readonly cartProducts: Locator;
  readonly checkoutBtn: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly overviewTitle: Locator;
  readonly totalPrice: Locator;
  readonly finishBtn: Locator;
  readonly thankYouMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsName = page.locator(".inventory_item_name");
    this.addToCartButtons = page.locator("button:has-text('Add to cart')");
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartProducts = page.locator(".inventory_item_name");

    this.checkoutBtn = page.locator("#checkout");
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = page.locator("#continue");
    
    this.overviewTitle = page.getByText("Checkout: Overview");
    this.totalPrice = page.locator(".summary_total_label");

    this.finishBtn = page.locator("#finish");
    this.thankYouMsg = page.getByText("Thank you for your order!");
  }

  // 1) Add Product to Cart
  async addProductToCart() {
    await this.productsName.first().waitFor({ state: "visible" });

    const total = await this.productsName.count();
    const index = Math.floor(Math.random() * total);

    const selectedProduct = await this.productsName.nth(index).innerText();
    await this.addToCartButtons.nth(index).click();

    return selectedProduct;
  }

  // 2) Verify Cart Item
  async verifyCartProduct(product: string) {
    await this.cartIcon.click();
    const cartItems = await this.cartProducts.allInnerTexts();
    await expect(cartItems).toContain(product);
  }

  // 3) Fill Checkout Details
  async checkout() {
    await this.checkoutBtn.click();
    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
    await this.postalCode.fill(formData.postalCode);
    await this.continueBtn.click();

    await expect(this.overviewTitle).toBeVisible();
    await expect(this.totalPrice).toBeVisible();
  }

  // 4) Finish Order
  async finishOrder() {
    await this.finishBtn.click();
    await expect(this.thankYouMsg).toBeVisible();
    return await this.thankYouMsg.innerText();
  }

  // FINAL FULL WORKFLOW (ONLY CALL THIS)
  async completeCheckoutFlow() {
    const product = await this.addProductToCart();
    await this.verifyCartProduct(product);
    await this.checkout();
    return await this.finishOrder();
  }
}
