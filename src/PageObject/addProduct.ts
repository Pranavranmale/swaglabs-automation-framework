import { Page, expect } from "@playwright/test";

export class AddProduct {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Add product to cart and verify Products page
    async addProduct() {
        await this.page.getByText("Sauce Labs Backpack").click();
        await this.page.getByText("Add to cart").click();
        await this.page.getByText("Back to products").click();
        
        // Assertion to ensure we are back on Products page
        await expect(this.page.getByText('Products')).toBeVisible();
    }
}
