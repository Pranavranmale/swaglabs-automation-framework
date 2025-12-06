import { Page, Locator, expect } from "@playwright/test";

export class AddProduct {
    readonly page: Page;

    readonly product: Locator;
    readonly addToCartBtn: Locator;
    readonly removeBtn: Locator;
    readonly cartIcon: Locator;
    readonly backToProductsBtn: Locator;
    readonly productsTitle: Locator;

    constructor(page: Page, productName: string) {
        this.page = page;

        // Dynamic locators based on product name
        this.product = page.getByText(productName);
        this.addToCartBtn = page.locator(`[data-test^="add-to-cart"]`, { hasText: productName });
        this.removeBtn = page.locator(`[data-test^="remove"]`, { hasText: productName });

        this.cartIcon = page.locator(".shopping_cart_container");
        this.backToProductsBtn = page.getByText("Back to products");
        this.productsTitle = page.getByText("Products");
    }

    async openProductDetail() {
        await expect(this.product).toBeVisible({ timeout: 5000 });
        await this.product.click();
    }

    async addToCart() {
        await expect(this.addToCartBtn).toBeVisible({ timeout: 5000 });
        await this.addToCartBtn.click();
    }

    async removeFromCart() {
        await expect(this.removeBtn).toBeVisible({ timeout: 5000 });
        await this.removeBtn.click();
    }

    async goBackToProducts() {
        await this.backToProductsBtn.click();
        await expect(this.productsTitle).toBeVisible({ timeout: 5000 });
    }

    async openCart() {
        await this.cartIcon.click();
        await expect(this.page.locator(".cart_list")).toBeVisible({ timeout: 5000 });
    }

    async addProductFlow() {
        await this.openProductDetail();
        await this.addToCart();
        await this.goBackToProducts();
    }
}
