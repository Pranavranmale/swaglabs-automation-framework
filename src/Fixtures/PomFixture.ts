import { test as baseTest } from '@playwright/test';
import { Login } from '../PageObject/login';
import { DropDown } from '../PageObject/DropDown';
import { ProductCheckoutFlow } from '../PageObject/ProductCheckoutFlow';
import { TestResultsHandler } from '../utils/testResultsHandler';
import { LoginFail } from '../PageObject/loginFail';

type pages = {
    login: Login;
    dropdown: DropDown;
    productCheckoutFlow: ProductCheckoutFlow;
    testResultsHandler: TestResultsHandler;
    loginFail: LoginFail;
};

const testPages = baseTest.extend<pages>({

    login: async ({ page }, use) => { 
        await use(new Login(page));
    },

    dropdown: async ({ page }, use) => {
        await use(new DropDown(page));
    },

    productCheckoutFlow: async ({ page }, use) => {
        await use(new ProductCheckoutFlow(page));
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