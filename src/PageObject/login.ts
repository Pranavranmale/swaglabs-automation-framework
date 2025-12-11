import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class Login {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly successTitle: Locator;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;

    //Locators Initialization
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.errorMsg = page.locator("text=Epic sadface: Username and password do not match any user in this service");
    this.successTitle = page.locator(".header_secondary_container");
  }
  async loginPage(): Promise<void> {
    
    const username = process.env.USERNAME1;
    const password = process.env.PASSWORD1;
    const baseURL = process.env.BASE_URL;


    await this.page.goto(baseURL, { timeout: 20000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await expect(this.successTitle).toBeVisible({ timeout: 10000 });
    console.log("Login successful!");
  }
}
