import type { CsvImportType } from "./domain";

export type CsvValidationSeverity = "error" | "warning";

export interface CsvValidationIssue {
  rowNumber: number;
  column?: string;
  code: string;
  message: string;
  severity: CsvValidationSeverity;
}

export interface CsvParseResult<TNormalizedRow> {
  type: CsvImportType;
  rows: TNormalizedRow[];
  issues: CsvValidationIssue[];
}

export interface IncidentCsvRow {
  incidentClass?: string;
  number?: string;
  state?: string;
  stateType?: string;
  date?: string;
  storeCode?: string;
  storeName?: string;
  supplierCode?: string;
  supplierName?: string;
  brandName?: string;
  phonePrimary?: string;
  fax?: string;
  openDuration?: string;
  customerCode?: string;
  customerName?: string;
  phoneSecondary?: string;
  truck?: string;
  sellerCode?: string;
  sellerName?: string;
  orderFiscalYear?: string;
  orderSeries?: string;
  orderNumber?: string;
  referencePrimary?: string;
  deliveryFiscalYear?: string;
  deliverySeries?: string;
  deliveryNumber?: string;
  itemCode?: string;
  description?: string;
  description2?: string;
  referenceSecondary?: string;
  quantity?: string;
  incidentType?: string;
  severity?: string;
  lastReceptionDate?: string;
  resolved?: "S" | "N" | string;
  resolvedDate?: string;
  solution?: string;
  createdAtSource?: string;
  associatedExpenses?: string;
  cost?: string;
  rawPayload: Record<string, unknown>;
}

export interface GeneralDeliveryCsvRow {
  company?: string;
  series?: string;
  date?: string;
  number?: string;
  fiscalYear?: string;
  storeCode?: string;
  storeName?: string;
  customerCode?: string;
  customerName?: string;
  lineNumber?: string;
  itemCode?: string;
  description?: string;
  description2?: string;
  supplierReference?: string;
  warehouse?: string;
  quantity?: string;
  price?: string;
  total?: string;
  installerCodeOrName?: string;
  warehouseSeller?: string;
  familyLevel1?: string;
  supplierCodeAndName?: string;
  brandCodeAndName?: string;
  sellerCodeOrName?: string;
  grossAmount?: string;
  discounts?: string;
  taxableBase?: string;
  vatRate?: string;
  vatAmount?: string;
  surchargeRate?: string;
  surchargeAmount?: string;
  subtotal?: string;
  deliveryTotal?: string;
  rawPayload: Record<string, unknown>;
}

export interface SupplierDeliveryCsvRow {
  warehouse?: string;
  familyLevel1?: string;
  storeCode?: string;
  series?: string;
  documentType?: string;
  number?: string;
  orderNumber?: string;
  lineNumber?: string;
  documentDate?: string;
  customerCode?: string;
  itemCode?: string;
  description?: string;
  quantitySum?: string;
  salesBaseSum?: string;
  supplierCodeAndName?: string;
  brandCodeAndName?: string;
  rawPayload: Record<string, unknown>;
}

export interface SellerDeliveryCsvRow {
  sellerCode?: string;
  sellerName?: string;
  company?: string;
  series?: string;
  number?: string;
  fiscalYear?: string;
  date?: string;
  serviceDate?: string;
  customerCode?: string;
  customerName?: string;
  storeCode?: string;
  grossAmount?: string;
  discounts?: string;
  taxableBase?: string;
  vatAmount?: string;
  surchargeAmount?: string;
  total?: string;
  createdByUser?: string;
  createdAtSource?: string;
  rawPayload: Record<string, unknown>;
}

export interface InstallerDeliveryCsvRow {
  installerCode?: string;
  installerName?: string;
  company?: string;
  series?: string;
  number?: string;
  fiscalYear?: string;
  date?: string;
  serviceDate?: string;
  customerCode?: string;
  customerName?: string;
  storeCode?: string;
  grossAmount?: string;
  discounts?: string;
  taxableBase?: string;
  vatAmount?: string;
  surchargeAmount?: string;
  total?: string;
  createdByUser?: string;
  createdAtSource?: string;
  rawPayload: Record<string, unknown>;
}

