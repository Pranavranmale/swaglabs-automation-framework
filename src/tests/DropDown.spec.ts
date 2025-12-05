import { test } from '../Fixtures/PomFixture';
test("DropDown", async ({ page, login, dropdown }) => {
        await login.login();  // Login first
        await dropdown.dropdown();
        await page.waitForTimeout(2000);
    });