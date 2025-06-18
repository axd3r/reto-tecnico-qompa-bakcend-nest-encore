export enum DocumentType {
  FACTURA = 'FACTURA',
  BOLETA = 'BOLETA',
  RECIBO = 'RECIBO',
}

export enum PucharseReceiptStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  OBSERVED = 'OBSERVED',
}

export class PucharseReceiptEntity {
  public readonly igv: number;
  public readonly total: number;
  public status: PucharseReceiptStatus;

  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly supplierRuc: string,
    public readonly invoiceNumber: string,
    public readonly amount: number,
    public readonly issueDate: Date,
    public readonly documentType: DocumentType,
    status?: PucharseReceiptStatus,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    this.igv = parseFloat((this.amount * 0.18).toFixed(2));
    this.total = parseFloat((this.amount + this.igv).toFixed(2));
    this.status = status ?? PucharseReceiptStatus.PENDING;
  }
}
