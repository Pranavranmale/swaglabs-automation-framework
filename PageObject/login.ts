import { expect, Page, test } from '@playwright/test';
import Credintial from './Credintial.json'


export class Login{
    readonly page:Page   
    constructor(page:Page){
        this.page=page      
    }
    async login(){
        await this.page.getByPlaceholder('Username').fill(Credintial.Test.username)
        await this.page.getByPlaceholder('Password').fill(Credintial.Test.password)
        await this.page.getByRole('button',{name:"Login"}).click()
        await expect(this.page.locator('.app_logo')).toHaveText("Swag Labs")
    }
}