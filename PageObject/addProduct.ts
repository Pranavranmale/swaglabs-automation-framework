import { Page,expect } from "@playwright/test";

export class AddProdunct{
    readonly page:Page
    constructor(page:Page)
    {
        this.page=page
    }
    async AddProdunct(){
        await this.page.getByText("Sauce Labs Backpack").click()
        await this.page.getByText("Add to cart").click()
        await this.page.getByText("Back to products").click()
        await expect(this.page.getByText('Products')).toBeVisible();
    }
}