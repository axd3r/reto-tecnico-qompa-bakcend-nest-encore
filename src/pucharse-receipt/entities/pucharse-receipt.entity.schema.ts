import { z } from "zod";
import { DocumentType, PucharseReceiptStatus } from "./pucharse-receipt.entity";

export const PucharseReceiptEntitySchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  supplierRuc: z.string(),
  invoiceNumber: z.string(),
  amount: z.number(),
  igv: z.number(),
  total: z.number(),
  issueDate: z.coerce.date(),
  documentType: z.nativeEnum(DocumentType),
  status: z.nativeEnum(PucharseReceiptStatus),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type PucharseReceiptEntity = z.infer<typeof PucharseReceiptEntitySchema>;
