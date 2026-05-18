# Servicios de negocio

Esta carpeta alojara la logica de negocio desacoplada de React.

## Servicios obligatorios

- `importService.ts`: recibe CSV, detecta tipo, parsea, crea lote, valida y coordina persistencia.
- `normalizationService.ts`: normaliza tiendas, proveedores, marcas, vendedores y montadores.
- `dashboardService.ts`: calcula KPIs, agregados y payloads para ECharts.
- `reportService.ts`: construye informes dinamicos, filtros, agrupaciones y futuras exportaciones.
- `coordinatorAssignmentService.ts`: aplica reglas activas por prioridad para asignar coordinador.
- `csvValidationService.ts`: valida cabeceras, tipos, fechas, importes y duplicados.
- `dataQualityService.ts`: detecta incidencias sin albaran, no cruzadas y catalogos no normalizados.

## Servicios recomendados

- `permissionService.ts`: permisos por rol y modulo.
- `auditService.ts`: trazabilidad de acciones sensibles.
- `exportService.ts`: exportacion futura a Excel/PDF.

## Regla de arquitectura

Los componentes React no deben contener reglas de negocio. Deben invocar Server Components, Server Actions o Route Handlers, y estos delegaran en servicios.

