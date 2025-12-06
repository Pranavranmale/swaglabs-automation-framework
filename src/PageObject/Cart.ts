import { Page, expect } from "@playwright/test";
import { formData } from "../types/Types";

export class Cart {
  readonly page: Page;

  // Locators
  readonly product;
  readonly addToCartBtn;
  readonly cartIcon;
  readonly checkoutBtn;
  readonly firstName;
  readonly lastName;
  readonly postalCode;
  readonly continueBtn;
  readonly finishBtn;
  readonly thankYouMsg;
  readonly backHomeBtn;
  readonly productName;
  readonly totalPrice;
  readonly cartTitle;

  constructor(page: Page) {
    this.page = page;

    // Product click from inventory
    this.product = this.page.locator("text=Sauce Labs Backpack");

    // Universal Add to Cart (Inventory and Product Detail Page)
    this.addToCartBtn = this.page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"], [data-test="add-to-cart"]'
    );

    this.cartIcon = this.page.locator(".shopping_cart_container");
    this.checkoutBtn = this.page.locator("#checkout");
    this.firstName = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.postalCode = this.page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = this.page.locator("#continue");
    this.finishBtn = this.page.locator("#finish");
    this.thankYouMsg = this.page.locator("text=THANK YOU FOR YOUR ORDER");
    this.backHomeBtn = this.page.locator("#back-to-products");
    this.productName = this.page.locator(".inventory_item_name");
    this.totalPrice = this.page.locator(".summary_total_label");
    this.cartTitle = this.page.locator("text=Checkout: Overview");
  }

  // STEP-1 Add Product to cart with validation
  async addProductToCart() {
    await expect(this.product).toBeVisible({ timeout: 5000 }); // Product appear check

    await this.product.click();

    await expect(this.addToCartBtn).toBeVisible({ timeout: 5000 }); // Button visible check
    await this.addToCartBtn.click();

    await this.cartIcon.click();
    await expect(this.checkoutBtn).toBeVisible(); // Ensure cart opened properly

    await this.checkoutBtn.click();
  }

  // STEP-2 Form Filling with safety checks
  async fillCheckoutForm() {
    await expect(this.firstName).toBeVisible();
    await expect(this.lastName).toBeVisible();
    await expect(this.postalCode).toBeVisible();

    await this.firstName.fill(formData.firstName);
    await this.lastName.fill(formData.lastName);
    await this.postalCode.fill(formData.postalCode);

    await this.continueBtn.click();
  }

  // STEP-3 Order Verification + Complete Order
  async placeOrder() {
    await expect(this.cartTitle).toBeVisible(); // On Overview Page
    await expect(this.productName).toContainText("Sauce Labs Backpack");
    await expect(this.totalPrice).toBeVisible();

    await this.finishBtn.click();
    await expect(this.thankYouMsg).toBeVisible();

    await this.backHomeBtn.click();
    await expect(this.page.locator("text=Products")).toBeVisible(); // Home verified
  }

  // Full Checkout Flow (One line execution)
  async completeCheckoutFlow() {
    await this.addProductToCart();
    await this.fillCheckoutForm();
    await this.placeOrder();
  }
}
