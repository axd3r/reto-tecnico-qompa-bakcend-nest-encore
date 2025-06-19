import { PrismaClient, DocumentType, PucharseReceiptStatus } from '../generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.pucharseReceipt.deleteMany();
  console.log('🗑️ Comprobantes anteriores eliminados');

  const usedCombinations = new Set<string>();

  for (let i = 0; i < 100; i++) {
    const amount = parseFloat(faker.finance.amount({ min: 100, max: 5000, dec: 2 }));
    const igv = parseFloat((amount * 0.18).toFixed(2));
    const total = parseFloat((amount + igv).toFixed(2));

    let invoiceNumber: string;
    let supplierRuc: string;
    let comboKey: string;

    do {
      const serie = `${faker.string.alpha({ casing: 'upper', length: 1 })}${String(faker.number.int({ min: 1, max: 999 })).padStart(3, '0')}`;
      const correlativo = String(faker.number.int({ min: 1, max: 99999999 })).padStart(8, '0');
      invoiceNumber = `${serie}-${correlativo}`;
      supplierRuc = faker.string.numeric(11);
      comboKey = `${supplierRuc}-${invoiceNumber}`;
    } while (usedCombinations.has(comboKey));

    usedCombinations.add(comboKey);

    await prisma.pucharseReceipt.create({
      data: {
        companyId: faker.string.uuid(),
        supplierRuc,
        invoiceNumber,
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

  console.log('✅ Seed completado con 100 comprobantes únicos');
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
