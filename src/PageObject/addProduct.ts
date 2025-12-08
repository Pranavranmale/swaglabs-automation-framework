import { Page, Locator, expect } from "@playwright/test";

export class AddProduct {
    readonly page: Page;

    readonly product: Locator;                // product name text locator
    readonly listPageAddBtn: Locator;         // add button visible on product list page
    readonly detailPageAddBtn: Locator;       // add button inside product detail page
    readonly cartIcon: Locator;               // cart icon on top of UI
    readonly backToProductsBtn: Locator;      // button to return to products page
    readonly productsTitle: Locator;          // products page title

    constructor(page: Page, productName: string) {
        this.page = page;
        // Convert product name to URL-friendly format (lowercase + '-' for spaces)
        // Used to build dynamic [data-test="add-to-cart-xxx"] locators
        const formattedName = productName.toLowerCase().replace(/ /g, "-");

        this.product = page.getByText(productName, { exact: true });
        this.listPageAddBtn   = page.locator(`[data-test="add-to-cart-${formattedName}"]`);
        this.detailPageAddBtn = page.locator(`[data-test="add-to-cart-${formattedName}"]`);

        this.cartIcon = page.locator(".shopping_cart_container");
        this.backToProductsBtn = page.getByRole("button", { name: "Back to Products" });
        this.productsTitle = page.getByRole("heading", { name: "Products" });
    }

    // add product either from list or detail page
    async addToCart() {
        if(await this.listPageAddBtn.isVisible()) {
            await this.listPageAddBtn.click();
        } 
        else {
            await this.product.click();
            await expect(this.detailPageAddBtn).toBeVisible();
            // await this.detailPageAddBtn.click();
        }
    }

    // navigate to cart page
    async openCart() {
        await this.cartIcon.click();
        await expect(this.page.locator(".cart_list")).toBeVisible();
    }


  

    // single function to execute full add product flow
    async addProductFlow() {
        await this.addToCart();
    }
}
