-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('FACTURA', 'BOLETA', 'RECIBO');

-- CreateEnum
CREATE TYPE "PucharseReceiptStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED', 'OBSERVED');

-- CreateTable
CREATE TABLE "PucharseReceipt" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "supplierRuc" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "status" "PucharseReceiptStatus" NOT NULL DEFAULT 'PENDING',
    "igv" DECIMAL(12,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PucharseReceipt_pkey" PRIMARY KEY ("id")
);
