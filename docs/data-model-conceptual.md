# Modelo conceptual de datos

Este documento describe entidades y relaciones sin definir todavia Prisma ni SQL.

## Entidades principales

### Usuario

Representa acceso interno a la aplicacion.

Campos conceptuales:

- id
- name
- email
- role
- active

Roles previstos:

- admin
- direccion
- coordinador_postventa
- importador
- consulta

### ImportBatch

Lote de carga CSV.

Campos conceptuales:

- id
- type
- file_name
- status
- total_rows
- valid_rows
- invalid_rows
- started_at
- finished_at
- created_by_user_id

### ImportRowIssue

Error o advertencia asociado a una fila importada.

Campos conceptuales:

- id
- import_batch_id
- row_number
- column_name
- code
- message
- severity

### Incident

Tabla maestra de incidencias postventa.

Campos conceptuales:

- id
- source_number
- resolved_flag
- resolution_status
- incident_date
- resolved_date
- store_id
- supplier_id
- brand_id
- seller_id
- coordinator_id
- incident_type
- severity
- delivery_key_partial
- unmatched_delivery
- associated_expenses
- cost
- raw_payload
- import_batch_id

### Delivery

Salida general o salida especializada.

Campos conceptuales:

- id
- delivery_key
- source_type
- company
- fiscal_year
- series
- number
- line_number
- delivery_date
- store_id
- supplier_id
- brand_id
- seller_id
- installer_id
- quantity
- amount
- raw_payload
- import_batch_id

### Store

Catalogo normalizado de tiendas.

### Supplier

Catalogo normalizado de fabricantes/proveedores.

### Brand

Catalogo normalizado de marcas.

### Seller

Catalogo normalizado de vendedores.

### Installer

Catalogo normalizado de montadores.

### Coordinator

Persona responsable de gestionar incidencias.

### CoordinatorAssignmentRule

Regla de asignacion de coordinador.

Campos conceptuales:

- id
- priority
- active
- coordinator_id
- store_id
- supplier_id
- brand_id
- incident_type
- severity

Regla MVP:

```text
store_id -> coordinator_id
```

Regla futura:

```text
store_id + supplier_id + brand_id + incident_type + severity -> coordinator_id
```

## Relaciones clave

- `Incident` pertenece opcionalmente a `Store`, `Supplier`, `Brand`, `Seller` y `Coordinator`.
- `Delivery` pertenece opcionalmente a `Store`, `Supplier`, `Brand`, `Seller` e `Installer`.
- `Incident` puede cruzar contra `Delivery` por clave completa o parcial.
- `ImportBatch` agrupa incidencias, salidas y errores de validacion.
- `CoordinatorAssignmentRule` resuelve coordinador por prioridad.

## Decisiones abiertas antes de Prisma

- Separar salidas en cabecera y linea o mantener una tabla de lineas con datos repetidos.
- Definir unicidad real de `delivery_key` cuando hay varias lineas de un mismo albaran.
- Definir si `Supplier` y `Manufacturer` son el mismo concepto en el dominio.
- Confirmar si `COD_Y_PROVEEDOR` y `COD_Y_MARCA` contienen codigo y descripcion en un mismo campo.
- Confirmar formatos reales de fecha, importes, separador CSV y codificacion.

