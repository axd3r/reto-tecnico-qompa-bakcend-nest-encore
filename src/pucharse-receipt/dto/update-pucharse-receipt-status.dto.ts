import { IsEnum } from 'class-validator';
import { PucharseReceiptStatus } from '../entities/pucharse-receipt.entity';

export class UpdatePucharseReceiptStatusDto {
  @IsEnum(PucharseReceiptStatus)
  status: PucharseReceiptStatus;
}
