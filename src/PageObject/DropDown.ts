import { Page, Locator, expect } from "@playwright/test";

export class DropDown {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productCards = page.locator('.inventory_item');  // Product visibility check
    }

    // verify products loaded on UI
    async verifyProductsVisible(){
        await expect(this.productCards.first()).toBeVisible();
        expect(await this.productCards.count()).toBeGreaterThan(0);
    }

    // get product list with names & price
    async getProducts() {
        const names = await this.productNames.allInnerTexts();
        const prices = await this.productPrices.allInnerTexts();

        return names.map((name, index) => ({
            name,
            price: Number(prices[index].replace("$",""))
        }));
    }

    // dropdown selection reusable
    async selectSort(type: string) {
        await this.page.waitForSelector('.product_sort_container', { timeout: 3000 });
        await this.sortDropdown.selectOption(type);
    }

    // reusable full validation method
    async validateSorting() {
        const beforeSort = await this.getProducts();
        const originalNames = beforeSort.map(p => p.name);
        const originalPrices = beforeSort.map(p => p.price);

        // A–Z
        await this.selectSort('az');
        const az = await this.getProducts();
        expect(az.map(p => p.name)).toEqual([...originalNames].sort());

        // Z–A
        await this.selectSort('za');
        const za = await this.getProducts();
        expect(za.map(p => p.name)).toEqual([...originalNames].sort().reverse());

        // Low to High
        await this.selectSort('lohi');
        const lo = await this.getProducts();
        expect(lo.map(p => p.price)).toEqual([...originalPrices].sort((a,b)=>a-b));

        // High to Low
        await this.selectSort('hilo');
        const hi = await this.getProducts();
        expect(hi.map(p => p.price)).toEqual([...originalPrices].sort((a,b)=>b-a));
    }
}
