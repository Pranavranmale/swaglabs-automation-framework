import { test } from "../Fixtures/PomFixture";


test("Validate Product and Sorting", async ({ page, login, dropdown }) => {

    await login.loginPage();          // login
    await dropdown.verifyProductsVisible(); 
    await dropdown.validateSorting(); // entire sorting logic inside class

    console.log("Sorting Validation passed successfully");
});