import { Knex } from 'knex';
import { PucharseReceiptInterface } from './interfaces/purchase-receipt.interface';

export const pucharseReceiptsProviders = [
  {
    provide: 'PURCHASE_RECEIPT_MODEL',
    useFactory: (orm: Knex) => () => orm<PucharseReceiptInterface>('PucharseReceipt'),
    inject: ['DATABASE_CONNECTION'],
  },
];
