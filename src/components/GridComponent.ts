import { Page, Locator,expect } from '@playwright/test';

export class GridComponent {
    protected page: Page;
    protected gridRoot: Locator;

    constructor(page: Page, gridRootSelector: string) {
        this.page = page;
        this.gridRoot = this.page.locator(gridRootSelector);
    }

    async getRow(identifier: string | number): Promise<Locator> {
        // This is a placeholder. A real implementation would need a robust way
        // to identify rows, e.g., by a unique ID or by index.
        if (typeof identifier === 'number') {
            return this.gridRoot.locator('.row').nth(identifier);
        }
        return this.gridRoot.locator(`.row[data-id="${identifier}"]`);
    }

    async clickActionInRow(identifier: string | number, actionText: string) {
        const row = await this.getRow(identifier);
        await row.getByRole('button', { name: actionText }).click();
    }

    async verifyRowData(identifier: string | number, expectedData: { [key: string]: string }) {
        const row = await this.getRow(identifier);
        for (const key in expectedData) {
            const cell = row.locator(`.cell[data-column="${key}"]`);
            await expect(cell).toHaveText(expectedData[key]);
        }
    }
}
