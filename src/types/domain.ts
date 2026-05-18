export type UserRole =
  | "admin"
  | "direccion"
  | "coordinador_postventa"
  | "importador"
  | "consulta";

export type CsvImportType =
  | "general_deliveries"
  | "supplier_deliveries"
  | "incidents"
  | "seller_deliveries"
  | "installer_deliveries";

export type ImportStatus = "pending" | "validating" | "imported" | "failed";

export type IncidentResolutionStatus = "open" | "resolved";

export type DataQualityFindingType =
  | "missing_delivery"
  | "unmatched_delivery"
  | "unnormalized_supplier"
  | "duplicated_seller"
  | "duplicated_installer";

export interface DeliveryKeyParts {
  company?: string;
  fiscalYear: string;
  series: string;
  number: string;
}

export interface ImportBatchSummary {
  id: string;
  type: CsvImportType;
  fileName: string;
  status: ImportStatus;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  createdAt: string;
}

export interface IncidentListFilters {
  dateFrom?: string;
  dateTo?: string;
  status?: IncidentResolutionStatus;
  storeId?: string;
  coordinatorId?: string;
  supplierId?: string;
  brandId?: string;
  sellerId?: string;
  installerId?: string;
  type?: string;
  severity?: string;
}

export interface DashboardKpis {
  openIncidents: number;
  resolvedIncidents: number;
  resolutionRate: number;
  totalCost: number;
  associatedExpenses: number;
  averageOpenDays: number;
  criticalIncidents: number;
}

export interface CoordinatorAssignmentInput {
  storeId?: string;
  supplierId?: string;
  brandId?: string;
  incidentType?: string;
  severity?: string;
}

export interface DataQualityFinding {
  id: string;
  type: DataQualityFindingType;
  entityId?: string;
  message: string;
  createdAt: string;
}

