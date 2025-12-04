import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { FormComponent } from '../components/FormComponent';
import { GridComponent } from '../components/GridComponent';
import { DocumentDetails } from '../types/test-data';

export class QMSInitiationPage extends BasePage {
    readonly form: FormComponent;
    readonly grid: GridComponent;

    constructor(page: Page) {
        super(page);
        // These selectors would need to be updated for the actual application
        this.form = new FormComponent(page);
        this.grid = new GridComponent(page, '#qms-grid');
    }

    async fillInitiationForm(details: DocumentDetails) {
        // Using the generic form component to fill fields.
        // The field labels here ('Document Type', 'Title') would need to match the actual application.
        await this.form.fillField('Document Type', details.documentType);
        await this.form.fillField('Title', details.title);

        // For the 'approvers' array, a real implementation would need a more specific method
        // to handle a multi-select dropdown or a similar component.
        console.log(`(Placeholder) Selecting approvers: ${details.approvers.join(', ')}`);
        // e.g., await this.form.selectFromMultiSelect('Approvers', details.approvers);
        
        await this.form.submit('Initiate');
    }

    async verifyDocumentInGrid(documentTitle: string) {
        // This is a placeholder for demonstration purposes.
        // The actual implementation would search the grid for the document.
        console.log(`Verifying document "${documentTitle}" in grid.`);
    }
}
