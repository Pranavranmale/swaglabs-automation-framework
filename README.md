# SauceDemo Web Automation Testing Framework

![Playwright](https://img.shields.io/badge/Playwright-1.53.1-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)

A robust automation framework for conducting end-to-end tests on the [SauceDemo](https://www.saucedemo.com/) e-commerce website using Playwright and TypeScript.

## Table of Contents

- [Features Tested](#features-tested)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Running the Tests](#running-the-tests)
- [Reporting](#reporting)

## Features Tested

This framework covers the following user scenarios and features:

-   **User Authentication**: Validates the login process for standard and locked-out users.
-   **Product Sorting**: Verifies that the product list can be sorted by various criteria (Name A-Z, Name Z-A, Price low-high, Price high-low).
-   **Shopping Cart Management**: Ensures products can be added to and removed from the shopping cart.
-   **Checkout Process**: Automates the full checkout flow from cart to purchase confirmation.
-   **End-to-End (E2E) Flow**: A comprehensive test that simulates a full user journey from login to checkout.

## Project Structure

The project is organized into the following directories:

```
P:/saucedemo Web Automaiton/
├─── Src/
│   ├─── Fixtures/       # Test fixtures, including Page Object Model (POM) setup
│   ├─── PageObject/      # Page Object Model classes for abstracting page interactions
│   ├─── Tests/           # Test specifications (e.g., login, cart, checkout)
│   ├─── Types/           # TypeScript type definitions
│   └─── utils/           # Utility functions and helper modules
├─── .github/           # GitHub Actions workflow configurations
├─── playwright.config.ts # Playwright configuration file
├─── package.json         # Project metadata and dependencies
└─── tsconfig.json        # TypeScript compiler options
```

## Technology Stack

-   **Framework**: [Playwright](https://playwright.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Dependency Management**: [npm](https://www.npmjs.com/)
-   **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/) (version 20.x or later recommended)
-   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd saucedemo-web-automaiton
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

### Environment Configuration

This project uses `.env` files to manage environment-specific variables (e.g., URLs, usernames). You will need to create environment files for each environment you want to test against.

1.  Create the following files in the root of the project:
    -   `.env.dev`
    -   `.env.qa`
    -   `.env.prod`

2.  Add the required variables to each file. For example:
    ```ini
    # .env.dev
    BASE_URL=https://www.saucedemo.com/
    USERNAME=standard_user
    PASSWORD=secret_sauce
    ```

## Running the Tests

Tests can be executed against different environments using the scripts defined in `package.json`.

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run test:dev`  | Runs tests using the `.env.dev` configuration.  |
| `npm run test:qa`   | Runs tests using the `.env.qa` configuration.   |
| `npm run test:prod` | Runs tests using the `.env.prod` configuration. |

Tests are executed via the `playwright-run.cjs` script, which loads the appropriate environment variables before starting the Playwright test runner.

## Reporting

After the test run is complete, Playwright generates a detailed HTML report. You can view the report by opening the following file:

```bash
./playwright-report/index.html
```

This report provides a comprehensive overview of the test results, including passed/failed tests, timings, and browser-specific logs.
