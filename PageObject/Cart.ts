import { Page } from "@playwright/test";
export class Cart{
    readonly page:Page
    constructor(page:Page)
    {
        this.page=page
    }
    async AddProdunct(){
        await this.page.getByText("Sauce Labs Backpack").click()
        await this.page.getByText("Add to cart").click()
        await this.page.locator(".shopping_cart_container").click()
        await this.page.locator('#checkout').click();
    }
  }
