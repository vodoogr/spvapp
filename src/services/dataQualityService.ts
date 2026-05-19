import type { DataQualityFinding } from "@/types/domain";

export async function getDataQualityFindings(): Promise<DataQualityFinding[]> {
  return [
    {
      id: "dq-1",
      type: "unmatched_delivery",
      entityId: "INC-24091",
      message: "Incidencia con albaran informado sin salida encontrada.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "dq-2",
      type: "missing_delivery",
      entityId: "INC-24112",
      message: "Incidencia guardada sin albaran asociado.",
      createdAt: new Date().toISOString(),
    },
  ];
}

