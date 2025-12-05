import { Page } from "@playwright/test";

export class DropDown {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async dropdown() {
        const dropdownLocator = this.page.locator('.product_sort_container');

        await dropdownLocator.click();                 // Open dropdown
        await dropdownLocator.selectOption('az');      // A → Z
        await dropdownLocator.selectOption('za');      // Z → A
        await dropdownLocator.selectOption('lohi');    // Low → High
        await dropdownLocator.selectOption('hilo');    // High → Low
    }
}