import { test } from '../Fixtures/PomFixture';
import dotenv from "dotenv";
import {TestNames} from '../Utils/AllTestNames';
dotenv.config();
// Extract baseURL from environment variables
const baseURL = process.env.BASE_URL;
test('Login test', async ({ page, login,testResultsHandler }) => {
    try{
    await page.goto(baseURL);
    await login.loginFail();
    await login.loginPage();
    testResultsHandler.addTestResult(TestNames.LoginTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(TestNames.LoginTestName, "failed", error.message); 
         throw error;
    }
});