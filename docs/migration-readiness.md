# Recomendaciones antes de migraciones

No crear migraciones Prisma hasta completar estas decisiones:

1. Validar una muestra real de cada CSV.
2. Confirmar separador, encoding, fechas e importes.
3. Cerrar nombres canonicos de columnas.
4. Decidir si salidas se modelan como cabecera + linea o como tabla de lineas.
5. Confirmar unicidad de incidencias: numero, clase, ejercicio, tienda u otra combinacion.
6. Confirmar si proveedor y fabricante son una misma entidad.
7. Confirmar si marca se extrae de `COD_Y_MARCA` o de campos separados.
8. Definir estrategia de `raw_payload` y retencion historica.
9. Definir indices para filtros principales.
10. Definir reglas exactas de permisos por rol y modulo.

## Criterio para empezar Prisma

Se puede empezar `schema.prisma` cuando existan:

- Contratos CSV validados con muestras.
- Lista de entidades y relaciones aprobada.
- Reglas de cruce de albaran documentadas.
- Politica de errores de importacion.
- Campos necesarios para dashboard e informes MVP.

