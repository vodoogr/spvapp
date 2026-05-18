# Contratos CSV iniciales

Este documento define los contratos funcionales iniciales de los cinco CSV. No sustituye a muestras reales: antes de migraciones hay que validar cabeceras, codificacion, separador, fechas e importes contra archivos reales.

## Tipos de importacion

```text
general_deliveries
supplier_deliveries
incidents
seller_deliveries
installer_deliveries
```

## Reglas comunes

- Guardar siempre `raw_payload` por fila cuando sea util para auditoria o depuracion.
- Mantener `import_batch_id` en cada registro importado.
- Registrar errores por fila sin bloquear necesariamente todo el lote.
- Normalizar fechas e importes antes de persistir datos analiticos.
- No usar `Numero` como clave unica de salida.

## Claves tecnicas

Para salidas:

```text
delivery_key = empresa + '-' + ejercicio + '-' + serie + '-' + numero
```

Para incidencias:

```text
incident_delivery_key = ejercicio_albaran + '-' + serie_albaran + '-' + albaran
```

Como incidencias no trae `empresa`, el cruce debe admitir:

```text
ejercicio_albaran + '-' + serie_albaran + '-' + albaran
```

Tambien se debe estudiar mapeo `tienda -> empresa` si los datos reales lo requieren.

## Incidencias

Estado calculado:

- `Resuelto = S` implica incidencia finalizada.
- `Resuelto = N` implica incidencia abierta.

Campos relevantes:

```text
Clase Incidencia
Numero
Estado
Tipo Estado
Fecha
Tienda
Nombre Tienda
Proveedor
Nombre Proveedor
Marca
Telefono
Fax
Duracion Abierta
Cliente
Nombre Cliente
Telefono
Camion
Vendedor
Nombre Vendedor
Ejercicio Pedido
Serie Pedido
Pedido
Referencia
Ejercicio Albaran
Serie Albaran
Albaran
Articulo
Descripcion
Descripcion2
Referencia
Cantidad
Tipo
Gravedad
Ultima Recepcion
Resuelto
Fecha Resuelto
Solucion
Fecha de Alta
Gastos Asociados
Coste
```

Observaciones:

- Hay columnas repetidas: `Telefono` y `Referencia`.
- El parser debe preservar el orden de columnas para renombrar duplicados de forma determinista.
- Incidencias sin albaran se guardan y se marcan como no cruzadas.
- Incidencias con albaran no encontrado se guardan con `unmatched_delivery = true`.

## Salidas generales

Uso principal: salidas por tienda, proveedor, marca, montador, vendedor y cruce con incidencias.

Campos conocidos:

```text
Empresa
Serie
Fecha
Numero
Ejercicio
Tienda
Nombre Tienda
Cliente
Nombre Cliente
Linea
Articulo
Descripcion
Descripcion2
RefProv
Almacen
Cantidad
Precio
Total
Montador
VeAlmacen
DFamil_N1
Tienda.
Doc.
NUMERO_PED
Fecha_Doc
Suma Cantidad
Suma Ventas BI
COD_Y_PROVEEDOR
COD_Y_MARCA
Vendedor
Imp.Bruto
Descuentos
Base Imp.
IVA
Imp.IVA
Rec.
Imp.Recargo
Subtotal
TOTAL ALB
```

Observaciones:

- Hay cabeceras repetidas o variantes: `Serie`, `Numero`, `Linea`, `Articulo`, `Descripcion`, `Cliente`.
- Antes de migrar hay que decidir si se modela cabecera y linea por separado.

## Salidas fabricante

Uso principal: proveedor, marca, familia, tienda y ratios de incidencia.

Campos conocidos:

```text
Almacen
DFamil_N1
Tienda.
Serie
Doc.
Numero
NUMERO_PED
Linea
Fecha_Doc
Cliente
Articulo
Descripcion
Suma Cantidad
Suma Ventas BI
COD_Y_PROVEEDOR
COD_Y_MARCA
```

## Salidas por vendedor

El CSV tiene dos columnas `Vendedor`. Renombrar por posicion:

```text
seller_code
seller_name
```

Campos conocidos:

```text
Vendedor
Vendedor
Empresa
Serie
Numero
Ejercicio
Fecha
Fecha Serv.
Cliente
Nombre
Tienda
Imp.Bruto
Descuentos
Base Imp.
Imp. IVA
Recargo
Total
Usuario Alta
Fecha Alta
```

## Salidas por montador

El CSV tiene dos columnas `Montador`. Renombrar por posicion:

```text
installer_code
installer_name
```

Campos conocidos:

```text
Montador
Montador
Empresa
Serie
Numero
Ejercicio
Fecha
Fecha Serv.
Cliente
Nombre
Tienda
Imp.Bruto
Descuentos
Base Imp.
Imp. IVA
Recargo
Total
Usuario Alta
Fecha Alta
```

## Validaciones minimas por lote

- Tipo de CSV detectado o seleccionado.
- Cabeceras obligatorias presentes.
- Duplicados de cabecera gestionados segun contrato.
- Fechas parseables.
- Importes parseables.
- Cantidades parseables.
- `Resuelto` limitado a `S` o `N` en incidencias.
- `delivery_key` calculable en salidas cuando existan sus partes.
- `incident_delivery_key` calculable solo cuando la incidencia tenga albaran.

