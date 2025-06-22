import { DocumentType, PucharseReceiptStatus } from "../entities/pucharse-receipt.entity";

export interface FilterPucharseReceiptDto {
  startDate?: string;
  endDate?: string;
  documentType?: DocumentType;
  status?: PucharseReceiptStatus;
  page?: number;
  limit?: number;
}
