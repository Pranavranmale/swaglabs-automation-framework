import { Page, Locator, expect } from "@playwright/test";

export class DropDown {
    readonly page: Page;

    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productCards: Locator;  // Product visible check

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');

        // Product fetch locators
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

        // Product Visibility locator
        this.productCards = page.locator('.inventory_item');
    }

    // Validate product visible
    async verifyProductsVisible(){
        await expect(this.productCards.first()).toBeVisible();
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);
    }

    // Get Products Name + Price from UI
    async getProducts() {
        const names = await this.productNames.allInnerTexts();
        const prices = await this.productPrices.allInnerTexts();

        return names.map((name, index) => ({
            name,
            price: Number(prices[index].replace("$", "")),
        }));
    }

    // Dropdown select (Reusable)
    async selectSort(type: string) {
        await this.sortDropdown.selectOption(type);
    }

    // Sorting Assertions
    async validateSorting() {

        // Before Sorting Data Capture
        const beforeSort = await this.getProducts();
        const originalNames = beforeSort.map(p => p.name);
        const originalPrices = beforeSort.map(p => p.price);

        // A → Z
        await this.selectSort('az');
        const azSorted = await this.getProducts();
        expect(azSorted.map(p => p.name)).toEqual([...originalNames].sort());

        // Z → A
        await this.selectSort('za');
        const zaSorted = await this.getProducts();
        expect(zaSorted.map(p => p.name)).toEqual([...originalNames].sort().reverse());

        // Low → High Price Sort
        await this.selectSort('lohi');
        const lowHigh = await this.getProducts();
        expect(lowHigh.map(p => p.price)).toEqual([...originalPrices].sort((a,b) => a-b));

        // High → Low Price Sort
        await this.selectSort('hilo');
        const highLow = await this.getProducts();
        expect(highLow.map(p => p.price)).toEqual([...originalPrices].sort((a,b) => b-a));
    }
}