import { test as base } from './page-fixtures';
import { TestData } from '../types/test-data';

// Hardcoded test data for now. This could be loaded from a JSON file or an API.
const testData: TestData = {
    documentDetails: {
        documentType: 'SOP',
        title: 'QMS Automation Test Document',
        approvers: ['Approver1', 'QualityManager'],
    },
};

type MyFixtures = {
    testData: TestData;
};

export const test = base.extend<MyFixtures>({
    testData: async ({}, use) => {
        await use(testData);
    },
});

export { expect } from './page-fixtures';
