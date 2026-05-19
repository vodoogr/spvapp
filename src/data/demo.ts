import type { DashboardKpis } from "@/types/domain";

export const demoKpis: DashboardKpis = {
  openIncidents: 126,
  resolvedIncidents: 342,
  resolutionRate: 73.1,
  totalCost: 48250,
  associatedExpenses: 9340,
  averageOpenDays: 8.7,
  criticalIncidents: 14,
};

export const demoStatusBreakdown = [
  { name: "Abiertas", value: 126 },
  { name: "Finalizadas", value: 342 },
];

export const demoIncidentsByStore = [
  { name: "Sevilla", value: 48 },
  { name: "Cordoba", value: 36 },
  { name: "Malaga", value: 32 },
  { name: "Huelva", value: 28 },
  { name: "Cadiz", value: 24 },
];

export const demoSupplierRanking = [
  { name: "Proveedor Norte", value: 18.4 },
  { name: "Maderas Sur", value: 13.2 },
  { name: "Tapizados Sol", value: 10.7 },
  { name: "Descanso Plus", value: 8.9 },
  { name: "Metal Home", value: 6.5 },
];

export const demoCriticalIncidents = [
  {
    id: "INC-24091",
    store: "Sevilla",
    supplier: "Proveedor Norte",
    severity: "Critica",
    openDays: 19,
    coordinator: "Ana Ruiz",
  },
  {
    id: "INC-24104",
    store: "Malaga",
    supplier: "Tapizados Sol",
    severity: "Alta",
    openDays: 14,
    coordinator: "Luis Marquez",
  },
  {
    id: "INC-24118",
    store: "Cordoba",
    supplier: "Maderas Sur",
    severity: "Critica",
    openDays: 11,
    coordinator: "Marta Leon",
  },
];

export const modules = [
  { title: "Dashboard Postventa", href: "/dashboard" },
  { title: "Incidencias", href: "/incidencias" },
  { title: "Informes", href: "/informes" },
  { title: "Cargas CSV", href: "/cargas-csv" },
  { title: "Calidad de datos", href: "/calidad-datos" },
  { title: "Coordinadores", href: "/coordinadores" },
  { title: "Proveedores", href: "/catalogos/proveedores" },
  { title: "Marcas", href: "/catalogos/marcas" },
  { title: "Tiendas", href: "/catalogos/tiendas" },
  { title: "Vendedores", href: "/catalogos/vendedores" },
  { title: "Montadores", href: "/catalogos/montadores" },
  { title: "Configuracion", href: "/configuracion" },
];
