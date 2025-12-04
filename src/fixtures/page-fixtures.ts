import { test as base } from '@playwright/test';
import { QMSInitiationPage } from '../pages/qms-initiation.page';

type MyFixtures = {
    qmsPage: QMSInitiationPage;
};

export const test = base.extend<MyFixtures>({
    qmsPage: async ({ page }, use) => {
        await use(new QMSInitiationPage(page));
    },
});

export { expect } from '@playwright/test';
