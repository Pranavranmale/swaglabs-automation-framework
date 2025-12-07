import { test } from "../Fixtures/PomFixture";
import { DropDownTestName } from '../Utils/handalResults';

test("Validate Product and Sorting", async ({ login, dropdown,testResultsHandler }) => {

  try{
      await login.loginPage();          // login
    await dropdown.verifyProductsVisible(); 
    await dropdown.validateSorting(); // entire sorting logic inside class
    console.log("Sorting Validation passed successfully");
    testResultsHandler.addTestResult(DropDownTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(DropDownTestName, "failed", error.message); 
         throw error;
    }
});

