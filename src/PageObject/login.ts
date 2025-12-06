import { expect, Locator, Page } from "@playwright/test";
import { credentials } from "../Types/Types"
import dotenv from "dotenv";
import { configs } from '../Types/Types';

dotenv.config();
const { baseURL } = configs;

export class Login {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly successTitle: Locator;
  private credentials = credentials;

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
    const username1 = process.env.INVALID_USERNAME || "invalid_user";
    const password2 = process.env.INVALID_PASSWORD || "invalid_pass";

    await this.page.goto(baseURL);
    await this.usernameInput.fill(username1);
    await this.passwordInput.fill(password2);
    await this.loginBtn.click();

    await this.page.waitForLoadState("networkidle"); //wait for page to load
    await expect(this.errorMsg).toBeVisible({ timeout: 10000 });
  }

  async loginPage(): Promise<void> {
    const username = this.credentials.username;
    const password = this.credentials.password;

    await this.page.goto(baseURL);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();

    await this.page.waitForLoadState("networkidle");
    await expect(this.successTitle).toBeVisible({ timeout: 10000 });
    console.log("Login successful!");
  }
}
