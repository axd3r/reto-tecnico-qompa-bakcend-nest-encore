import { api } from "encore.dev/api";
import applicationContext from "../../applicationContext";
import { CreatePucharseReceiptDto } from "../dto/create-pucharse-receipt.dto";
import { FilterPucharseReceiptDto } from "../dto/filter-pucharse-receipt.dto";
import { AskAIDto } from "../dto/ask-ai.dto";
import { UpdatePucharseReceiptStatusDto } from "../dto/update-pucharse-receipt-status.dto";

export const createPucharseReceipt = api(
  {
    method: "POST",
    path: "/pucharse-receipts",
    expose: true,
  },
  async (dto: CreatePucharseReceiptDto) => {
    const { pucharseReceiptService } = await applicationContext;
    return pucharseReceiptService.create(dto);
  }
);

export const findAllPucharseReceipts = api(
  {
    method: "GET",
    path: "/pucharse-receipts",
    expose: true,
  },
  async (query: FilterPucharseReceiptDto) => {
    const { pucharseReceiptService } = await applicationContext;
    return pucharseReceiptService.filter(query);
  }
);

export const updatePucharseReceiptStatus = api(
  {
    method: "PATCH",
    path: "/pucharse-receipts/status/:id",
    expose: true,
  },
  async ({ id, data }: {
    id: string;
    data: UpdatePucharseReceiptStatusDto
  }) => {
    const { pucharseReceiptService } = await applicationContext;
    return pucharseReceiptService.updateStatus(id, data.status);
  }
);

export const exportPucharseReceipts = api(
  {
    method: "GET",
    path: "/pucharse-receipts/export",
    expose: true,
  },
  async (query: FilterPucharseReceiptDto) => {
    const { pucharseReceiptService } = await applicationContext;
    return pucharseReceiptService.exportCsv(query);
  }
);

export const askAI = api(
  {
    method: "POST",
    path: "/pucharse-receipts/ai/ask",
    expose: true,
  },
  async (dto: AskAIDto) => {
    const { pucharseReceiptService } = await applicationContext;
    return pucharseReceiptService.askAI(dto.question);
  }
);
