import type { IncidentListFilters } from "@/types/domain";

export async function getAvailableReports() {
  return [
    "general_postventa",
    "coordinator",
    "store",
    "supplier",
    "brand",
    "seller",
    "installer",
    "data_quality",
  ] as const;
}

export async function buildIncidentReport(filters: IncidentListFilters) {
  return {
    filters,
    generatedAt: new Date().toISOString(),
    rows: [],
  };
}

