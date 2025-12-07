import { test } from '../Fixtures/PomFixture';
import dotenv from "dotenv";
dotenv.config();
// Extract baseURL from environment variables
const baseURL = process.env.BASE_URL;
test('Login', async ({ page, login }) => {
    await page.goto(baseURL);
    await login.loginFail();
    await login.loginPage();
});