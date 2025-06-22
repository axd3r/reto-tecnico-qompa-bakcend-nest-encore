import { Module } from '@nestjs/common';
import { PucharseReceiptService } from './pucharse-receipt.service';
//import { PucharseReceiptController } from './pucharse-receipt.controller';
import { SunatService } from '../sunat/sunat.service';
import { pucharseReceiptsProviders } from './purchase-receipts.providers';
import { DatabaseModule } from '../core/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    DatabaseModule
  ],
  //controllers: [PucharseReceiptController],
  providers: [
    ...pucharseReceiptsProviders,
    PucharseReceiptService,
    SunatService
  ],
  exports: [
    PucharseReceiptService,
    SunatService
  ],
})
export class PucharseReceiptModule {}
