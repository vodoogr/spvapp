import {
  demoCriticalIncidents,
  demoIncidentsByStore,
  demoKpis,
  demoStatusBreakdown,
  demoSupplierRanking,
} from "@/data/demo";

export async function getDashboardSummary() {
  return {
    kpis: demoKpis,
    statusBreakdown: demoStatusBreakdown,
    incidentsByStore: demoIncidentsByStore,
    supplierRanking: demoSupplierRanking,
    criticalIncidents: demoCriticalIncidents,
  };
}

