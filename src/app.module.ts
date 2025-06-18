import { Module } from '@nestjs/common';
import { PucharseReceiptModule } from './pucharse-receipt/pucharse-receipt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PucharseReceiptModule],
})
export class AppModule {}
