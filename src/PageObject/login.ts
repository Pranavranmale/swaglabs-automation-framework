import { expect, Page } from "@playwright/test";
import dotenv from "dotenv";
import Credentials from "./Credintial.json";

dotenv.config();

interface ICredentials {
  Test:{
    username: string;
    password: string;
  };
}

export class Login {
  readonly page: Page;
   credentials: ICredentials = Credentials as ICredentials;

  constructor(page: Page) {
    this.page = page;
  }

  async login(): Promise<void> {
    // Use credentials from JSON file
    const username: string = this.credentials.Test.username;
    const password: string = this.credentials.Test.password;

    // UI actions
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();

    // Wait for navigation and verify login success
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("text=Swag Labs")).toBeVisible({ timeout: 10000 });
  }
}
