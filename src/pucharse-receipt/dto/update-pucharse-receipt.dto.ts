import { PartialType } from '@nestjs/mapped-types';
import { CreatePucharseReceiptDto } from './create-pucharse-receipt.dto';

export class UpdatePucharseReceiptDto extends PartialType(CreatePucharseReceiptDto) {}
