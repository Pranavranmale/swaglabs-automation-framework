import { test } from '../Fixtures/PomFixture';
import dotenv from "dotenv";
import {TestNames} from '../utils/Testname';
dotenv.config();
// Extract baseURL from environment variables
test('Login failure with invalid username and password', async ({ loginFail,testResultsHandler }) => {
    try{
    await loginFail.loginFail();
    testResultsHandler.addTestResult(TestNames.LoginFailTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(TestNames.LoginFailTestName, "failed", error.message); 
         throw error;
    }
});