import { PrismaClient, DocumentType, PucharseReceiptStatus } from '../generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 100; i++) {
    const amount = parseFloat(faker.finance.amount({ min: 100, max: 5000, dec: 2 }));
    const igv = parseFloat((amount * 0.18).toFixed(2));
    const total = parseFloat((amount + igv).toFixed(2));

    await prisma.pucharseReceipt.create({
      data: {
        companyId: faker.string.uuid(),
        supplierRuc: faker.string.numeric(11),
        invoiceNumber: faker.string.alphanumeric(8).toUpperCase(),
        amount,
        igv,
        total,
        issueDate: faker.date.between({
          from: new Date('2024-01-01'),
          to: new Date('2024-06-15'),
        }),
        documentType: faker.helpers.arrayElement([
          DocumentType.FACTURA,
          DocumentType.BOLETA,
          DocumentType.RECIBO,
        ]),
        status: faker.helpers.arrayElement([
          PucharseReceiptStatus.PENDING,
          PucharseReceiptStatus.VALIDATED,
          PucharseReceiptStatus.REJECTED,
          PucharseReceiptStatus.OBSERVED,
        ]),
      },
    });
  }
}

main()
  .then(() => {
    console.log('✅ Seed completado con 100 comprobantes');
  })
  .catch((e) => {
    console.error('❌ Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
