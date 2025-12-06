import { test, expect } from '../Fixtures/PomFixture';
import { TestResultsHandler } from "../utils/testResultsHandler";

const resultLogger = new TestResultsHandler();

test("DropDown Sorting and Product UI Visibility Validation", async  ({ page, login, dropdown }) => {
    {
         try {
        await login.loginPage();
        await page.waitForURL("**/inventory.html");

        // STEP 1  Ensure products visible
        await dropdown.verifyProductsVisible();
        console.log("Product list is visible.");

        // Get original product data
        const original = await dropdown.getProducts();
        expect(original.length).toBeGreaterThan(0);

        console.log("\nOriginal Product List:");
        console.table(original);

        // A - Z Sorting
        await dropdown.selectSort("az");
        const A_Z = await dropdown.getProducts();
        

        expect(A_Z.map(p => p.name)).toEqual([...original.map(p => p.name)].sort());
        console.log("\nA → Z Sorting validated.");
        console.log(`First product after A → Z sort: ${A_Z[0].name}`);

        // Z - A 
        await dropdown.selectSort("za");
        const Z_A = await dropdown.getProducts();

        expect(Z_A.map(p => p.name)).toEqual([...original.map(p => p.name)].sort().reverse()); //check original and alphabetically products are equal or not
        console.log("\nZ → A Sorting validated.");
        console.log(`First product after Z → A sort: ${Z_A[0].name}`);

        // LOW HIGH PRICE 
        await dropdown.selectSort("lohi");
        const LOW_HIGH = await dropdown.getProducts();

        expect(LOW_HIGH.map(p => p.price)).toEqual([...original.map(p => p.price)].sort((a,b)=>a-b));
        console.log("\nLow → High price sorting validated.");
        console.log(`Cheapest product: $${LOW_HIGH[0].price}`);

        // HIGH LOW PRICE 
        await dropdown.selectSort("hilo");
        const HIGH_LOW = await dropdown.getProducts();

        expect(HIGH_LOW.map(p => p.price)).toEqual([...original.map(p => p.price)].sort((a,b)=>b-a));
        console.log("\nHigh → Low price sorting validated.");
        console.log(`Highest-priced product: $${HIGH_LOW[0].price}`);

        // Save result in report
        resultLogger.addTestResult("DropDown Sorting & UI Validation", "passed");
        console.log("\nAll sorting validations completed successfully. Test Passed.");

        

    } catch (err: any) {
        resultLogger.addTestResult("DropDown Sorting & UI Validation", "failed", err.message);
        throw err;
    }
   }
});
