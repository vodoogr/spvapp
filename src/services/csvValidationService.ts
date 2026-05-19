import type { CsvImportType } from "@/types/domain";
import type { CsvValidationIssue } from "@/types/csv";

export const requiredHeaders: Record<CsvImportType, string[]> = {
  general_deliveries: ["Empresa", "Ejercicio", "Serie", "Numero"],
  supplier_deliveries: ["Serie", "Numero", "Fecha_Doc", "COD_Y_PROVEEDOR", "COD_Y_MARCA"],
  incidents: ["Numero", "Fecha", "Tienda", "Resuelto"],
  seller_deliveries: ["Vendedor", "Empresa", "Serie", "Numero", "Ejercicio"],
  installer_deliveries: ["Montador", "Empresa", "Serie", "Numero", "Ejercicio"],
};

export function validateHeaders(type: CsvImportType, headers: string[]): CsvValidationIssue[] {
  const normalizedHeaders = new Set(headers.map((header) => header.trim()));

  return requiredHeaders[type]
    .filter((header) => !normalizedHeaders.has(header))
    .map((header) => ({
      rowNumber: 0,
      column: header,
      code: "missing_required_header",
      message: `Falta la columna obligatoria ${header}.`,
      severity: "error",
    }));
}

export function detectDuplicatedHeaders(headers: string[]): CsvValidationIssue[] {
  const seen = new Map<string, number>();

  return headers.flatMap((header) => {
    const count = seen.get(header) ?? 0;
    seen.set(header, count + 1);

    if (count === 0) {
      return [];
    }

    return [
      {
        rowNumber: 0,
        column: header,
        code: "duplicated_header",
        message: `La columna ${header} aparece mas de una vez y se renombrara por posicion.`,
        severity: "warning" as const,
      },
    ];
  });
}

