import { test as baseTest } from '@playwright/test';
import { Login } from '../PageObject/login';
import { DropDown } from '../PageObject/DropDown';
import { AddProduct } from '../PageObject/addProduct';
import { Cart } from '../PageObject/Cart';
import { TestResultsHandler } from '../utils/testResultsHandler';
import { LoginFail } from '../PageObject/loginFail';

type pages = {
    login: Login;
    dropdown: DropDown;
    addProduct: AddProduct;
    cart: Cart;
    testResultsHandler: TestResultsHandler;
    addproduct: AddProduct;
    loginFail: LoginFail;
};

const testPages = baseTest.extend<pages>({

    login: async ({ page }, use) => { 
        await use(new Login(page));
    },

    dropdown: async ({ page }, use) => {
        await use(new DropDown(page));
    },

    addProduct: async ({ page }, use) => {
        await use(new AddProduct(page, 'Sauce Labs Backpack'));
    },

    cart: async ({ page }, use) => {
        await use(new Cart(page));
    },

    testResultsHandler: async ({}, use) => {
        await use(new TestResultsHandler('test-results/results.json'));
    },
    loginFail: async ({ page }, use) => {
        await use(new LoginFail(page));
    },

});

export const test = testPages;
export const expect = testPages.expect;