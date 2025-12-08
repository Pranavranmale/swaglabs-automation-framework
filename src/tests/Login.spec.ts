import { test } from '../Fixtures/PomFixture';
import dotenv from "dotenv";
import {TestNames} from '../utils/Testname';
dotenv.config();
// Extract baseURL from environment variables
test('Login test', async ({ login,testResultsHandler }) => {
    try{
    await login.loginPage();
    testResultsHandler.addTestResult(TestNames.LoginTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(TestNames.LoginTestName, "failed", error.message); 
         throw error;
    }
});