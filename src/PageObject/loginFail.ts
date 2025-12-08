import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";


dotenv.config();
const baseURL = process.env.BASE_URL;

export class LoginFail {
      readonly page: Page;
      readonly usernameInput: Locator;
      readonly passwordInput: Locator;
      readonly loginBtn: Locator;
      readonly errorMsg: Locator;
      readonly successTitle: Locator;
    
      constructor(page: Page) {
        this.page = page;
    
        //Locators Initialization
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginBtn = page.getByRole("button", { name: "Login" });
        this.errorMsg = page.locator("text=Epic sadface: Username and password do not match any user in this service");
        this.successTitle = page.locator("text=Swag Labs");
      }
      
        async loginFail(): Promise<void> {
          const invalidUsername = process.env.INVALID_USERNAME;
          const invalidPassword = process.env.INVALID_PASSWORD;
      
          await this.page.goto(baseURL);
          await this.usernameInput.fill(invalidUsername);
          await this.passwordInput.fill(invalidPassword);
          await this.loginBtn.click();
      
          await this.page.waitForLoadState("networkidle"); //wait for page to load
          await expect(this.errorMsg).toBeVisible({ timeout: 10000 });
        }     
}