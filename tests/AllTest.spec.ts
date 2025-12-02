import {test,expect} from '@playwright/test'
import { Login } from '../PageObject/login'
import { DropDown } from '../PageObject/DropDown'
import {AddProdunct} from '../PageObject/addProduct'
import { Cart } from '../PageObject/Cart'
test.beforeEach('Login',async({page})=>{
    await page.goto('https://www.saucedemo.com/') 
    const login=new Login(page)
    await login.login()
})
test.describe('All Test',async()=>{
    test("DropDown",async({page})=>{
        const dropdown=new DropDown(page)
        await dropdown.dropdown()
        await page.waitForTimeout(2000);
        
    })
    test('select product',async({page})=>{
        const product = new AddProdunct(page)
        await product.AddProdunct()
        await page.waitForTimeout(2000);
    })

    test('Cart Functionality',async({page})=>{
        const cart = new Cart(page)
        await cart.AddProdunct()
        await page.waitForTimeout(2000);
    })
    
    
});