import { DocumentType } from "../entities/pucharse-receipt.entity";

export interface CreatePucharseReceiptDto {
  companyId?: string;
  supplierRuc: string;
  invoiceNumber: string;
  amount: number;
  issueDate?: string;
  documentType: DocumentType;
}
