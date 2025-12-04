import { test, expect } from '@playwright/test';
import { Login } from '../PageObject/login';
import { DropDown } from '../PageObject/DropDown';
import { AddProduct } from '../PageObject/AddProduct';
import { Cart } from '../PageObject/Cart';
import { TestResultsHandler } from '../utils/testResultsHandler';
import Credentials from "../PageObject/Credintial.json";

interface ICredentials {
    baseURL: string;
}

// Extract baseURL from credentials JSON
const { baseURL } = Credentials as ICredentials;

// Initialize test results handler
const resultsHandler = new TestResultsHandler('test-results/results.json');

// Login before each test
test.beforeEach('Login', async ({ page }) => {
    await page.goto(baseURL);
    const login = new Login(page);
    await login.login();
});

// After hook to capture test results
test.afterEach(async ({ }, testInfo) => {
    const testName = testInfo.title;
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    const error = testInfo.errors && testInfo.errors.length > 0 ? testInfo.errors[0].message : undefined;
    
    resultsHandler.addTestResult(testName, status, error);
});

// Test suite
test.describe('All Tests', async () => {

    test("DropDown", async ({ page }) => {
        const dropdown = new DropDown(page);
        await dropdown.dropdown();
        await page.waitForTimeout(2000);
    });

    test('Select Product', async ({ page }) => {
        const product = new AddProduct(page);
        await product.addProduct();
        await page.waitForTimeout(2000);
    });

    test('Cart Functionality', async ({ page }) => {
        const cart = new Cart(page);
        await cart.addProduct();
        await page.waitForTimeout(2000);
        await cart.formDetails();   
        await page.waitForTimeout(2000);
        await cart.checkout();
        await page.waitForTimeout(2000);
    });

});