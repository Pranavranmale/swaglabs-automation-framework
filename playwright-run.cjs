const { execSync } = require("child_process");
require("dotenv").config({ path: process.env.DOTENV_CONFIG_PATH });

console.log("Loaded ENV:", process.env.DOTENV_CONFIG_PATH);
console.log("BASE_URL =", process.env.BASE_URL);

execSync("npx playwright test", { stdio: "inherit" });