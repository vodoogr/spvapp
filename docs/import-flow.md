# Flujo de importacion CSV

## Estado actual

La pantalla `Cargas CSV` ya permite:

- Seleccionar el tipo de CSV.
- Leer un archivo local en el navegador.
- Detectar cabeceras duplicadas.
- Validar columnas obligatorias segun tipo.
- Mostrar una vista previa de filas.
- Crear un lote inicial contra `/api/imports`.

## Siguiente paso tecnico

Conectar el lote a persistencia real:

1. Guardar `ImportBatch` en PostgreSQL con Prisma.
2. Guardar `ImportRowIssue` para errores y avisos.
3. Procesar filas por tipo con normalizadores.
4. Insertar incidencias y salidas con `raw_payload`.
5. Calcular `delivery_key` e `incident_delivery_key`.
6. Marcar incidencias sin albaran o sin cruce.

## Regla de seguridad

El importador de navegador solo debe hacer preview y validacion temprana. La validacion autoritativa debe repetirse en servidor antes de guardar datos.

