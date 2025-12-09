const { execSync } = require("child_process");

execSync("npx playwright test", { stdio: "inherit" });