import { test } from '../Fixtures/PomFixture';
import dotenv from "dotenv";
import {LoginTestName} from '../Utils/handalResults';
dotenv.config();
// Extract baseURL from environment variables
const baseURL = process.env.BASE_URL;
test('Login test', async ({ page, login,testResultsHandler }) => {
    try{
    await page.goto(baseURL);
    await login.loginFail();
    await login.loginPage();
    testResultsHandler.addTestResult(LoginTestName, "passed");
    }
    catch(error){
         testResultsHandler.addTestResult(LoginTestName, "failed", error.message); 
         throw error;
    }
});