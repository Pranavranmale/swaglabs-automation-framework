import { Page, Locator } from '@playwright/test';

export class FormComponent {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillField(fieldLabel: string, value: string) {
        // This is a placeholder. A real implementation would need a more robust
        // way to locate fields, e.g., by associating labels with input IDs.
        await this.page.locator(`label:has-text("${fieldLabel}")`).locator('..').locator('input').fill(value);
    }

    async submit(submitButtonText: string = 'Submit') {
        await this.page.getByRole('button', { name: submitButtonText }).click();
    }
}
