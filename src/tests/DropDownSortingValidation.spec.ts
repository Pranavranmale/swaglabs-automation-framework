import { test } from "../Fixtures/PomFixture";
import { TestNames } from "../Utils/Testname";
test("Validate Product and Sorting", async ({ login, dropdown,testResultsHandler }) => {

  try{
      await login.loginPage();          // login
    await dropdown.verifyProductsVisible(); 
    await dropdown.validateSorting(); // entire sorting logic inside class
    console.log("Sorting Validation passed successfully");
    testResultsHandler.addTestResult(TestNames.DropDownTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(TestNames.DropDownTestName, "failed", error.message); 
         throw error;
    }
});

