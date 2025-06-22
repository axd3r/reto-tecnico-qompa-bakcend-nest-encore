/* import { Body, Controller, Get, Param, Post, Query, Patch, Res } from '@nestjs/common';
import { PucharseReceiptService } from './pucharse-receipt.service';
import { CreatePucharseReceiptDto } from './dto/create-pucharse-receipt.dto';
import { UpdatePucharseReceiptStatusDto } from './dto/update-pucharse-receipt-status.dto';
import { FilterPucharseReceiptDto } from './dto/filter-pucharse-receipt.dto';
import { AskAIDto } from './dto/ask-ai.dto';
import type { Response } from 'express';
import { PucharseReceiptEntity } from './entities/pucharse-receipt.entity';

@Controller('pucharse-receipts')
export class PucharseReceiptController {
  constructor(private readonly pucharseReceiptService: PucharseReceiptService) { }

  @Post()
  async create(@Body() dto: CreatePucharseReceiptDto): Promise<PucharseReceiptEntity> {
    return this.pucharseReceiptService.create(dto);
  }

  @Get()
  async findAll(@Query() filter: FilterPucharseReceiptDto) {
    return this.pucharseReceiptService.filter(filter);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePucharseReceiptStatusDto,
  ) {
    return this.pucharseReceiptService.updateStatus(id, dto.status);
  }

  @Get('export')
  async export(
    @Query() filter: FilterPucharseReceiptDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const csv = await this.pucharseReceiptService.exportCsv(filter);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=receipts.csv');
    res.status(200).send(csv);
  }

  @Post('ai/ask')
  async ask(@Body() dto: AskAIDto) {
    return this.pucharseReceiptService.askAI(dto.question);
  }
}
 */