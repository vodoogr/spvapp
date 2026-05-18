# Arquitectura inicial

Este documento traduce `AGENTS.md` a una estructura tecnica inicial para una app interna de control postventa.

## Principios

- Next.js App Router como capa de rutas, pantallas y Route Handlers.
- Componentes React centrados en UI; la logica de negocio vive en servicios.
- Prisma ORM y NeonDB PostgreSQL como persistencia, con inicializacion perezosa de clientes para evitar errores durante `next build`.
- Validacion de CSV con Zod antes de normalizar o persistir.
- Trazabilidad completa de importaciones mediante lotes, filas, errores y `raw_payload`.
- Roles y permisos validados en servidor, no solo en navegacion.
- Tablas grandes con paginacion server-side y queries agregadas para dashboards.

## Estructura recomendada

```text
src/
  app/
    (auth)/
    (dashboard)/
      dashboard/
      incidencias/
      informes/
      cargas-csv/
      coordinadores/
      catalogos/
        tiendas/
        proveedores/
        marcas/
        vendedores/
        montadores/
      configuracion/
    api/
      imports/
      reports/
      data-quality/
  components/
    ui/
    layout/
    kpi/
    charts/
    tables/
    filters/
    uploads/
    reports/
    data-quality/
  features/
    dashboard/
    incidents/
    imports/
    reports/
    coordinators/
    catalogs/
  services/
  schemas/
    csv/
  types/
  lib/
    auth/
    csv/
    dates/
    db/
    numbers/
    permissions/
  config/
```

## Modulos funcionales

1. Dashboard Postventa
2. Incidencias
3. Informes
4. Cargas CSV
5. Coordinadores
6. Fabricantes / Proveedores
7. Marcas
8. Tiendas
9. Vendedores
10. Montadores
11. Configuracion

## Rutas iniciales

```text
/dashboard
/incidencias
/incidencias/[id]
/informes
/informes/[type]
/cargas-csv
/cargas-csv/[batchId]
/coordinadores
/coordinadores/reglas
/catalogos/tiendas
/catalogos/proveedores
/catalogos/marcas
/catalogos/vendedores
/catalogos/montadores
/configuracion
/configuracion/usuarios
/configuracion/permisos
```

## Route Handlers iniciales

```text
/api/imports
/api/imports/[batchId]
/api/reports
/api/data-quality
```

Usar Route Handlers para subidas CSV, validaciones de lotes, exportaciones y endpoints consumidos por componentes cliente. Usar Server Actions para mutaciones internas pequenas, formularios de configuracion y acciones de catalogo.

## Componentes reutilizables

- `AppSidebar`
- `TopBar`
- `RoleGuard`
- `KpiCard`
- `KpiGrid`
- `ChartCard`
- `EChartClient`
- `IncidentStatusDonut`
- `IncidentsByStoreChart`
- `SupplierRankingChart`
- `TemporalEvolutionChart`
- `DataTable`
- `ServerPaginatedTable`
- `FilterBar`
- `DateRangeFilter`
- `CatalogCombobox`
- `CsvUploadDropzone`
- `CsvTypeSelector`
- `ImportPreviewTable`
- `ImportResultSummary`
- `DataQualityAlertList`
- `ReportBuilder`
- `ReportFilterPanel`
- `ReportResultsTable`

## Decisiones de renderizado

- Paginas de dashboard e informes: Server Components con datos agregados y pequenos componentes cliente para graficos ECharts.
- Tablas grandes: Server Components para carga inicial y controles cliente para filtros, orden y paginacion.
- Cargas CSV: componente cliente para seleccion/feedback y Route Handler para procesamiento.
- Configuracion de coordinadores: formularios con React Hook Form, Zod y Server Actions.

