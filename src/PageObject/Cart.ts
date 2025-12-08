import { Page, expect, Locator } from "@playwright/test";
import { formData } from '../Types/Types';
export class Cart {
  readonly page: Page;

  // Locators
  readonly cartIcon: Locator;
  readonly checkoutBtn: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly thankYouMsg: Locator;
  readonly backHomeBtn: Locator;
  readonly productName: Locator;
  readonly totalPrice: Locator;
  readonly cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartIcon = this.page.locator(".shopping_cart_container");
    this.checkoutBtn = this.page.locator("#checkout");
    this.firstName = this.page.getByPlaceholder("First Name");
    this.lastName = this.page.getByPlaceholder("Last Name");
    this.postalCode = this.page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = this.page.locator("#continue");
    this.finishBtn = this.page.locator("#finish");
    this.thankYouMsg = this.page.locator('h2:has-text("Thank you for your order!")');
    this.backHomeBtn = this.page.locator("#back-to-products");
    this.productName = this.page.locator(".inventory_item_name");
    this.totalPrice = this.page.locator(".summary_total_label");
    this.cartTitle = this.page.locator("text=Checkout: Overview");
  }

  async getSuccessText() {
    await expect(this.thankYouMsg).toBeVisible();
    return this.thankYouMsg.innerText();
  }

  // Full Checkout Flow (One line execution)
  async completeCheckoutFlow() {
    await this.cartIcon.click();
    await expect(this.checkoutBtn).toBeVisible();
    await this.checkoutBtn.click();

    await expect(this.firstName).toBeVisible();
    await this.firstName.fill(formData.firstName);
    await expect(this.lastName).toBeVisible();
    await this.lastName.fill(formData.lastName);
    await expect(this.postalCode).toBeVisible();
    await this.postalCode.fill(formData.postalCode);
    await this.continueBtn.click();

    await expect(this.cartTitle).toBeVisible();
    await expect(this.totalPrice).toBeVisible();

    await this.finishBtn.click();
  }
}

