export interface PucharseReceiptInterface {
  id: string;
  companyId: string;
  supplierRuc: string;
  invoiceNumber: string;
  amount: number;
  igv?: number;
  total?: number;
  issueDate: Date;
  documentType: string;
  status: string;
}
