const { execSync } = require("child_process");
const path = require("path");

// Get the environment from the command-line arguments
let env = process.argv[2];

if (!env) {
  console.log("No environment specified, defaulting to 'local'.");
  env = "local";
}

const envFile = `.env.${env}`;
const envPath = path.resolve(__dirname, envFile);

try {
  require("dotenv").config({ path: envPath, override: true });
} catch (error) {
  console.error(`ERROR: Could not load environment file: ${envFile}`, error);
  process.exit(1);
}

console.log(`Loaded environment variables from: ${envFile}`);
console.log("BASE_URL =", process.env.BASE_URL);

execSync("npx playwright test", { stdio: "inherit" });