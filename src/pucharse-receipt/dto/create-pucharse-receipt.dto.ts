import { IsString, IsNumber, IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DocumentType } from '../entities/pucharse-receipt.entity';

export class CreatePucharseReceiptDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  companyId?: string;

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
