import { Test, TestingModule } from '@nestjs/testing';
import { PucharseReceiptService } from './pucharse-receipt.service';
import { SunatService } from '../sunat/sunat.service';
import { BadRequestException } from '@nestjs/common';
import { DocumentType } from './entities/pucharse-receipt.entity';
import { CreatePucharseReceiptDto } from './dto/create-pucharse-receipt.dto';

describe('PucharseReceiptService', () => {
  let service: PucharseReceiptService;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockResolvedValue(null),
    insert: jest.fn().mockResolvedValue(true),
    clone: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    count: jest.fn().mockResolvedValue([{ count: 1 }]),
    update: jest.fn().mockResolvedValue(true),
    whereBetween: jest.fn().mockReturnThis(),
  };

  const mockPurchaseReceiptModel = jest.fn(() => mockQueryBuilder);

  const mockSunatService = {
    validateRuc: jest.fn().mockResolvedValue({ razonSocial: 'Empresa SAC' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PucharseReceiptService,
        {
          provide: 'PURCHASE_RECEIPT_MODEL',
          useValue: mockPurchaseReceiptModel, // importante: función, no el objeto
        },
        {
          provide: SunatService,
          useValue: mockSunatService,
        },
      ],
    }).compile();

    service = module.get<PucharseReceiptService>(PucharseReceiptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un comprobante exitosamente', async () => {
    const data: CreatePucharseReceiptDto = {
      companyId: 'empresa-001',
      supplierRuc: '10763261374',
      invoiceNumber: 'F001-00001',
      amount: 1000,
      issueDate: '2024-05-01',
      documentType: DocumentType.FACTURA,
    };

    const result = await service.create(data);

    expect(result).toBeDefined();
    expect(mockSunatService.validateRuc).toHaveBeenCalledWith(data.supplierRuc);
    expect(mockQueryBuilder.insert).toHaveBeenCalled();
  });

  it('debería lanzar error si ya existe comprobante con el mismo número y RUC', async () => {
    mockQueryBuilder.first.mockResolvedValueOnce(true); // Simula comprobante duplicado

    const data: CreatePucharseReceiptDto = {
      companyId: 'empresa-001',
      supplierRuc: '20123456789',
      invoiceNumber: 'F001-00002',
      amount: 500,
      issueDate: '2024-05-01',
      documentType: DocumentType.BOLETA,
    };

    await expect(service.create(data)).rejects.toThrow(BadRequestException);
  });
});
