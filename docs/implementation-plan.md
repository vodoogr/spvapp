# Plan de implementacion

## Fase 1: base tecnica e importacion minima

- Crear proyecto Next.js con TypeScript, Chakra UI y App Router.
- Inicializar Chakra UI, Lucide React, Plotly, TanStack Table, React Hook Form y Zod.
- Preparar Prisma sin migracion definitiva hasta cerrar modelo.
- Configurar conexion NeonDB mediante variables de entorno.
- Crear servicios base.
- Crear contratos Zod de incidencias y salidas generales.
- Crear importador CSV basico con lote, validacion y resultado.

## Fase 2: dashboard e incidencias

- Dashboard minimo con KPIs de abiertas/finalizadas.
- Tabla de incidencias con filtros principales.
- Paginacion server-side.
- Detalle de incidencia.
- Primer informe de calidad de datos.

## Fase 3: coordinadores

- Catalogo de coordinadores.
- Reglas de asignacion Tienda -> Coordinador.
- Aplicacion automatica de reglas al importar.
- Informe por coordinador.

## Fase 4: ratios e informes ampliados

- Cruce de incidencias contra salidas.
- Ratios por tienda, proveedor, marca, vendedor y montador.
- Informes filtrables y preparacion de exportaciones.

## Fase 5: direccion y escalabilidad

- Exportacion Excel/PDF.
- Alertas operativas.
- Dashboard de calidad de datos.
- Evaluacion de vistas o materialized views si el volumen lo exige.

## Primer sprint recomendado

1. Recoger una muestra real anonima de cada CSV.
2. Crear mapa de columnas canonicas.
3. Definir modelo conceptual final.
4. Crear proyecto base Next.js.
5. Crear validadores Zod de CSV.
6. Implementar importacion de incidencias y salidas generales.
