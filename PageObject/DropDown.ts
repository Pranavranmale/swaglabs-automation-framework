import { Page } from "@playwright/test";

export class DropDown{
    readonly page:Page
    constructor(page:Page){
        this.page=page
    }
    async dropdown(){
        await this.page.locator('.product_sort_container').click();
        await this.page.selectOption('.product_sort_container','az')
        await this.page.selectOption('.product_sort_container','za')
        await this.page.selectOption('.product_sort_container','lohi')
        await this.page.selectOption('.product_sort_container','hilo')
    }
}