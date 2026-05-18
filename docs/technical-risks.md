# Riesgos tecnicos

## CSV con cabeceras duplicadas

Riesgo: columnas como `Vendedor`, `Montador`, `Telefono`, `Referencia`, `Serie`, `Numero` y `Linea` pueden llegar repetidas.

Mitigacion: parser que conserve orden de cabeceras y renombre duplicados por contrato.

## Formatos regionales

Riesgo: fechas e importes pueden venir en formato espanol, con coma decimal, punto de miles o formatos Excel.

Mitigacion: utilidades dedicadas en `src/lib/dates` y `src/lib/numbers`, con tests desde muestras reales.

## Cruce incompleto de albaranes

Riesgo: incidencias no trae `empresa`, pero salidas usan `empresa` en `delivery_key`.

Mitigacion: guardar clave parcial, marcar incertidumbre y crear informe de no cruzados.

## Volumen historico

Riesgo: dashboards lentos si se agregan millones de lineas en tiempo real.

Mitigacion: indices desde el inicio, queries agregadas, paginacion server-side y evaluacion futura de materialized views.

## Procesamiento CSV en serverless

Riesgo: archivos grandes pueden exceder tiempo o memoria.

Mitigacion: importacion por lotes, validacion incremental y diseno listo para cola/trabajo asincrono si hace falta.

## Seguridad basada solo en UI

Riesgo: usuarios acceden a endpoints o datos sin permiso si solo se oculta navegacion.

Mitigacion: validar rol en Route Handlers, Server Actions y servicios.

## Modelo prematuro

Riesgo: crear migraciones sin muestras reales puede fijar nombres y relaciones incorrectas.

Mitigacion: cerrar contratos CSV y modelo conceptual antes de `schema.prisma`.

