# SQA Automation Assessment: QMS E2E Testing

## 🎯 Overview
A technical assessment focused on implementing robust E2E automation tests for the QMS module using Playwright. This assessment evaluates your ability to design scalable test frameworks, implement Page Object Models (POM), and write reliable automated scripts following the existing project structure.

## 🔍 Core Requirements

### 1. Technical Stack
- **Framework**: Playwright with TypeScript
- **Pattern**: Page Object Model (POM)
- **Assertion**: Playwright Expect
- **Environment**: Node.js

### 2. Framework Guidelines
You are expected to **design and implement a mini-framework** that demonstrates how you would structure tests in a professional environment.

**Architecture Context:**
The QMS module is **Metadata-Driven**, meaning it uses generic Platform UI components (Grids, Forms) rather than custom-coded pages. Your automation strategy must reflect this.

**Expected Patterns:**
- **Generic Page Objects**: Create wrappers for reusable Platform components (e.g., `GridComponent`, `FormComponent`, `SidebarComponent`) instead of hardcoding selectors for every single page.
- **Page Object Model (POM)**: Your `QMSPage` should compose these generic components to perform business logic (e.g., `qmsPage.form.fill(...)`).
- **Playwright Fixtures**: 
  - Use fixtures to inject Page Objects into tests.
  - Use fixtures to manage test data.
- **Type Safety**: Use TypeScript interfaces for all data models.

### 3. Task: Automate "QMS Document Initiation"
Create a standalone Playwright project (or a simulated folder structure) to automate the following scenario.

#### Scenario to Automate
1. **Login** as a `Requestor` (e.g., `TestUser1`).
2. **Navigate** to `QMS` > `Document Initiation`.
3. **Fill Form**:
   - Select Document Type: "SOP" (Standard Operating Procedure).
   - Enter Title: "QMS Automation Test Document".
   - Select Approvers: Add `Approver1` and `QualityManager`.
4. **Submit** the document.
5. **Verify**:
   - Verify the document appears in "My Records".
   - Verify the status is "In Draft".
   - Verify a task is created for the `Requestor` to "Complete Draft".

## 🛠️ Technical Implementation

### 1. Expected Structure
Demonstrate a scalable structure similar to this:

```
src/
├── fixtures/
│   ├── page-fixtures.ts      <-- Fixtures to provide Page Objects
│   └── data-fixtures.ts      <-- Fixtures to provide Test Data
├── pages/
│   ├── base.page.ts
│   └── qms-initiation.page.ts
├── tests/
│   └── qms-document-initiation.spec.ts
└── utils/
    └── helpers.ts
```

### 2. Implementation Requirements

#### Page Object Model & Fixtures
- **Generic Wrappers**: Create reusable classes for `Grid` (e.g., `verifyRow`, `clickAction`) and `Form` (e.g., `fillField`, `submit`).
- **QMS Page**: Create a `QMSPage` that uses these wrappers.
- **Critical**: Do not create `new QMSPage(page)` inside your test. Instead, extend Playwright's `test` object to include a `qmsPage` fixture.
- Example usage in test:
  ```typescript
  test('Initiate Document', async ({ qmsPage, testData }) => {
    await qmsPage.goto();
    // Uses the generic form wrapper under the hood
    await qmsPage.fillInitiationForm(testData.documentDetails);
  });
  ```

#### Data Management
- Create a fixture that provides typed test data (e.g., `testData` fixture).
- Ensure data is separated from test logic.

### 3. Environment & CI/CD
- **Cross-Environment Execution**:
  - Implement a configuration strategy (e.g., `dotenv`, `config` object) to handle different environments (QA, Staging, Prod).
  - Base URLs and credentials should **not** be hardcoded.
- **CI Pipeline Integration**:
  - **Requirement**: Implement a GitHub Actions workflow using a YAML file (`.github/workflows/playwright.yml`).
  - The workflow must:
    - Trigger on `push` and `pull_request` events.
    - Install Node.js and dependencies.
    - Run the Playwright tests using the configured environment.
    - Upload the test report as an artifact.

## 🎯 Evaluation Matrix

### Code Quality (40%)
- Adherence to existing project structure and patterns.
- Proper use of TypeScript types and interfaces.
- Clean, readable, and maintainable code.
- Correct usage of Playwright fixtures.

### Framework Design (30%)
- Implementation of Page Object Model.
- Reusability of components (Grid, Buttons, Forms).
- Separation of concerns (Test Logic vs Page Logic vs Data).

### Reliability (20%)
- Robust element selection strategies.
- Proper handling of asynchronous operations.
- Error handling and reporting.

### DevOps & Configuration (10%)
- Environment configuration strategy.
- CI/CD workflow design.
- Test tagging and reporting strategy.

## 💡 Additional Considerations

### Bonus Points
1. **Advanced Scenarios**
   - Implement the "Approval" flow where the Approver logs in and approves the task.
   - Add a step to "Check Out" the document and upload a new version.

2. **CI/CD Integration**
   - Explain how you would tag this test for specific CI pipelines (e.g., `@QMS`, `@Sanity`).
   - Discuss how to handle test flakiness in a CI environment.

### Tips for Success
1. **Comments**: Add comments explaining complex logic or assumptions.
2. **Type Safety**: Ensure all data objects and page methods are typed.
3. **Use Helpers**: Don't reinvent the wheel all the time Use existing helpers like `getAccessToken`, `validateAPIResponse`, etc.

--------------
## Metadata
Tags: #technical-assessment #sqa-automation #playwright #qms
author: VaibhaV Arde
Created: 24-Nov-2024
Last Updated: 24-Nov-2024