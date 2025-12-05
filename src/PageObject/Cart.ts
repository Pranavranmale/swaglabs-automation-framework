import { Page } from "@playwright/test";
import { formData } from "../types/Types";
export class Cart {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Add product to cart and go to checkout
  async addProduct() {
    await this.page.getByText("Sauce Labs Backpack").click();
    await this.page.getByText("Add to cart").click();
    await this.page.locator(".shopping_cart_container").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("#checkout").click();
    await this.page.waitForLoadState("networkidle");
  }

  // Fill checkout form details
  async formDetails() {
    await this.page.waitForLoadState("networkidle");
    await this.page.getByPlaceholder("First Name").fill(formData.firstName);
    await this.page.getByPlaceholder("Last Name").fill(formData.lastName);
    await this.page
      .getByPlaceholder("Zip/Postal Code")
      .fill(formData.postalCode);
    await this.page.locator("#continue").click();
    await this.page.waitForLoadState("networkidle");
  }

  // Verify checkout overview and finish order
  async checkout() {
    await this.page.waitForLoadState("networkidle");
    // Verify elements are visible
    await this.page.getByText("Checkout: Overview").isVisible();
    await this.page.getByText("Sauce Labs Backpack").isVisible();
    await this.page.getByText("Total: $32.39").isVisible();
    await this.page.getByText("Payment Information:").isVisible();
    await this.page.getByText("Shipping Information:").isVisible();
    await this.page.getByText("Price Total").isVisible();

    // Finish checkout
    await this.page.locator("#finish").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("THANK YOU FOR YOUR ORDER").isVisible();
    await this.page.getByText("Back Home").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.getByText("Products").isVisible();
  }
}
