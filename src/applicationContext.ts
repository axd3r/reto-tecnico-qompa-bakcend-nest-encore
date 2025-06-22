import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PucharseReceiptService } from './pucharse-receipt/pucharse-receipt.service';
import { PucharseReceiptModule } from './pucharse-receipt/pucharse-receipt.module';

// Mounting the application as bare Nest standalone application so that we can use
// the Nest services inside our Encore endpoints
const applicationContext: Promise<{ pucharseReceiptService: PucharseReceiptService }> =
  NestFactory.createApplicationContext(AppModule).then((app) => {
    return {
      pucharseReceiptService: app.select(PucharseReceiptModule).get(PucharseReceiptService, { strict: true }),
    };
  });

export default applicationContext;
