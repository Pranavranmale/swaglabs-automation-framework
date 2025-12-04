export interface DocumentDetails {
    documentType: string;
    title: string;
    approvers: string[];
}

export interface TestData {
    documentDetails: DocumentDetails;
}
