import { test } from '../Fixtures/PomFixture';
import { configs } from '../types/Types';
import dotenv from "dotenv";
dotenv.config();

// Extract baseURL from environment variables
const { baseURL } = configs;


test('Login', async ({ page, login }) => {
    await page.goto(baseURL);
    await login.loginFail();
    await login.login();
    await page.waitForTimeout(2000);
});