import { test } from '../Fixtures/PomFixture';
import { TestResultsHandler } from '../utils/testResultsHandler';
import dotenv from "dotenv";
dotenv.config();



// Initialize test results handler
const resultsHandler = new TestResultsHandler('test-results/results.json');

// After hook to capture test results
test.afterEach(async ({ }, testInfo) => {
    const testName = testInfo.title;
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    const error = testInfo.errors && testInfo.errors.length > 0 ? testInfo.errors[0].message : undefined;
    
    resultsHandler.addTestResult(testName, status, error);
});

// Test suite
test.describe('All Tests', async () => {

    test('Login Test', async ({ page, login }) => {
        await login.loginFail();
        await login.login();
        await page.waitForTimeout(2000);
    });

    test("DropDown", async ({ page, login, dropdown }) => {
        await login.login();  // Login first
        await dropdown.dropdown();
        await page.waitForTimeout(2000);
    });

    test('Select Product', async ({ page, login, addProduct }) => {
        await login.login();  // Login first
        await addProduct.addProduct( );
        await page.waitForTimeout(2000);
    });

    test('Cart Functionality', async ({ page, login, cart }) => {
        await login.login();  // Login first
        await cart.addProduct();
        await page.waitForTimeout(2000);
        await cart.formDetails();   
        await page.waitForTimeout(2000);
        await cart.checkout();
        await page.waitForTimeout(2000);
    });
});