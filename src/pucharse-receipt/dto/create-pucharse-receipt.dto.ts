import { IsString, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DocumentType } from '../entities/pucharse-receipt.entity';

export class CreatePucharseReceiptDto {
  @IsString()
  companyId: string;

  @IsString()
  supplierRuc: string;

  @IsString()
  invoiceNumber: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;
}
