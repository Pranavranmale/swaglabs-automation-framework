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
     async formdetails(){
        await this.page.getByPlaceholder('First Name').fill('John');
        await this.page.getByPlaceholder('Last Name').fill('Doe');
        await this.page.getByPlaceholder('Zip/Postal Code').fill('12345');
        await this.page.locator('#continue').click();
    }
    async checkout(){
        await this.page.getByText('Checkout: Overview').isVisible();
        await this.page.getByText('Sauce Labs Backpack').isVisible();
        await this.page.getByText('Total: $32.39').isVisible();
        await this.page.getByText('Payment Information:').isVisible();
        await this.page.getByText('Shipping Information:').isVisible();
        await this.page.getByText('Price Total').isVisible();
        await this
        await this.page.locator('#finish').click();
        await this.page.getByText('THANK YOU FOR YOUR ORDER').isVisible();
    }   
  }
