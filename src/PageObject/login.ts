import { expect, Page } from "@playwright/test";
import { credentials } from "../types/Types"
import dotenv from "dotenv";
import { configs } from '../types/Types';

dotenv.config();
const { baseURL } = configs;
export class Login {
  readonly page: Page;
  private credentials = credentials;

  constructor(page: Page) {
    this.page = page;
  }
  
  async loginFail(): Promise<void> {
    // Use invalid credentials from environment variables
   
    const username1= process.env.INVALID_USERNAME || "invalid_user";
    const password2= process.env.INVALID_PASSWORD || "invalid_pass";

    // UI actions
    await this.page.goto(baseURL);
    await this.page.getByPlaceholder("Username").fill(username1);
    await this.page.getByPlaceholder("Password").fill(password2);
    await this.page.getByRole("button", { name: "Login" }).click();
    // Wait for error message
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("text=Epic sadface: Username and password do not match any user in this service")).toBeVisible({ timeout: 10000 });
  }

  async login(): Promise<void> {
    // Use credentials from Types - which gets from .env
    const username = this.credentials.username;
    const password = this.credentials.password;

    console.log("Login attempt with:", username);

    // UI actions
    await this.page.goto(baseURL);
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();

    // Wait for navigation and verify login success
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("text=Swag Labs")).toBeVisible({ timeout: 10000 });
    console.log("Login successful!");
  }
}