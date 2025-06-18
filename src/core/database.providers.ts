import { Knex } from 'knex';
import knex from 'knex';
import { Provider } from '@nestjs/common';

export const DatabaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Knex> => {
      return knex({
        client: 'pg',
        connection: {
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'Tris23ll!',
          database: 'pucharse_receipts',
        },
      });
    },
  },
];
