import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FilterPucharseReceiptDto } from './dto/filter-pucharse-receipt.dto';
import { DocumentType, PucharseReceiptEntity, PucharseReceiptStatus } from './entities/pucharse-receipt.entity';
import { Parser } from 'json2csv';
import OpenAI from 'openai';
import { SunatService } from 'src/sunat/sunat.service';
import { CreatePucharseReceiptDto } from './dto/create-pucharse-receipt.dto';

@Injectable()
export class PucharseReceiptService {
  constructor(
    @Inject('PURCHASE_RECEIPT_MODEL')
    private readonly pucharseReceiptModel: () => any,
    private readonly sunatService: SunatService,
  ) { }

  async create(dto: CreatePucharseReceiptDto): Promise<PucharseReceiptEntity> {
    console.log('DEBUG typeof model:', typeof this.pucharseReceiptModel);
    const duplicate = await this.pucharseReceiptModel()
      .where({ invoiceNumber: dto.invoiceNumber, supplierRuc: dto.supplierRuc })
      .first();

    if (duplicate) {
      throw new BadRequestException('Ya existe un comprobante con ese número y RUC');
    }

    const issueDate = dto.issueDate ? new Date(dto.issueDate) : new Date();
    const today = new Date();

    if (issueDate > today) {
      throw new BadRequestException('La fecha de emisión no puede ser futura');
    }

    if (issueDate.getFullYear() < 2000) {
      throw new BadRequestException('La fecha de emisión es demasiado antigua');
    }

    await this.sunatService.validateRuc(dto.supplierRuc);

    const now = new Date();
    const receipt = new PucharseReceiptEntity(
      crypto.randomUUID(),
      dto.companyId,
      dto.supplierRuc,
      dto.invoiceNumber,
      dto.amount,
      issueDate,
      dto.documentType as DocumentType,
      PucharseReceiptStatus.PENDING,
      now,
      now,
    );

    await this.pucharseReceiptModel().insert(receipt);

    return receipt;
  }

  async findAll(): Promise<PucharseReceiptEntity[]> {
    return this.pucharseReceiptModel().select('*').orderBy('issueDate', 'desc');
  }

  async findById(id: string): Promise<PucharseReceiptEntity> {
    const result = await this.pucharseReceiptModel().where({ id }).first();
    if (!result) {
      throw new NotFoundException('Comprobante no encontrado');
    }
    return result;
  }

  async updateStatus(id: string, status: string): Promise<PucharseReceiptEntity> {
    if (!Object.values(PucharseReceiptStatus).includes(status as PucharseReceiptStatus)) {
      throw new BadRequestException(`Estado inválido: ${status}`);
    }

    const existing = await this.findById(id);

    await this.pucharseReceiptModel()
      .where({ id })
      .update({ status });

    return { ...existing, status: status as PucharseReceiptStatus };
  }


  async filter(filter: FilterPucharseReceiptDto) {
    const {
      startDate,
      endDate,
      documentType,
      status,
      page = 1,
      limit = 10,
    } = filter;

    const baseQuery = this.pucharseReceiptModel().clone();

    if (startDate && endDate) {
      baseQuery.whereBetween('issueDate', [startDate, endDate]);
    }

    if (documentType) {
      baseQuery.andWhere('documentType', documentType);
    }

    if (status) {
      baseQuery.andWhere('status', status);
    }

    const totalResult = await baseQuery.clone().count('* as count').first();
    const total = Number(totalResult?.count || 0);

    const data = await baseQuery
      .clone()
      .orderBy('issueDate', 'desc')
      .offset((page - 1) * limit)
      .limit(limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async exists(invoiceNumber: string, supplierRuc: string): Promise<boolean> {
    const result = await this.pucharseReceiptModel()
      .where({ invoiceNumber, supplierRuc })
      .first();
    return !!result;
  }

  async findMany(filter: FilterPucharseReceiptDto): Promise<PucharseReceiptEntity[]> {
    const { startDate, endDate, documentType, status } = filter;

    const query = this.pucharseReceiptModel().clone().orderBy('issueDate', 'desc');

    if (startDate && endDate) {
      query.whereBetween('issueDate', [startDate, endDate]);
    }

    if (documentType) query.andWhere('documentType', documentType);
    if (status) query.andWhere('status', status);

    return query;
  }

  async exportCsv(filter: FilterPucharseReceiptDto): Promise<string> {
    const receipts = await this.findMany(filter);

    if (!receipts.length) {
      throw new BadRequestException('No hay comprobantes para exportar');
    }
    const transformed = receipts.map((receipt) => {
      return {
        company_id: receipt.companyId,
        supplier_ruc: receipt.supplierRuc,
        invoice_number: receipt.invoiceNumber,
        amount: receipt.amount,
        igv: receipt.igv,
        total: receipt.total,
        issue_date: new Date(receipt.issueDate).toISOString().split('T')[0],
        document_type: receipt.documentType,
        status: receipt.status,
      };
    });

    const parser = new Parser();
    return parser.parse(transformed);
  }

  async askAI(question: string): Promise<{ answer: string }> {
    const receipts = await this.findMany({}); // sin filtros por ahora

    if (!receipts.length) {
      return { answer: 'No se encontraron comprobantes para analizar.' };
    }

    const context = receipts.map((r) => ({
      invoiceNumber: r.invoiceNumber,
      amount: Number(r.amount),
      issueDate: r.issueDate.toISOString().split('T')[0],
      documentType: r.documentType,
      status: r.status,
    }));

    const prompt = `
                Eres un asistente financiero que ayuda a analizar comprobantes de compra.
                Responde con base en los siguientes datos JSON:

                ${JSON.stringify(context, null, 2)}

                Pregunta del usuario: "${question}"
                `;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    return {
      answer: response.choices[0].message.content ?? 'No se pudo generar una respuesta.',
    };
  }
}
