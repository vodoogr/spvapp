import type { CsvImportType, ImportBatchSummary } from "@/types/domain";

export async function createImportBatch(type: CsvImportType, fileName: string): Promise<ImportBatchSummary> {
  return {
    id: crypto.randomUUID(),
    type,
    fileName,
    status: "pending",
    totalRows: 0,
    validRows: 0,
    invalidRows: 0,
    createdAt: new Date().toISOString(),
  };
}

