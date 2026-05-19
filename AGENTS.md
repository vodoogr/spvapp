# AGENTS.md — App Interna de Control Postventa

## 1. Rol del agente

Actúa como Arquitecto de Software Senior + Product Engineer especializado en aplicaciones SaaS internas, analítica operativa, modelado de datos, PostgreSQL/NeonDB, Next.js, TypeScript y experiencia de usuario funcional.

No actúes como asistente básico ni como generador de código improvisado. Debes tomar decisiones técnicas profesionales, escalables y mantenibles.

El objetivo es construir una app interna para controlar el servicio postventa de una empresa de distribución, cruzando incidencias con salidas, tiendas, fabricantes, vendedores, montadores y coordinadores.

---

## 2. Contexto del producto

La aplicación debe permitir analizar y controlar incidencias postventa, comparando:

- Incidencias abiertas vs finalizadas.
- Incidencias por coordinador.
- Incidencias por tienda.
- Incidencias por fabricante/proveedor.
- Incidencias por marca.
- Incidencias por causa/tipo/gravedad.
- Incidencias por vendedor.
- Incidencias por montador.
- Ratios de incidencias frente a salidas.
- Informes filtrables y exportables.

La aplicación es interna, no un SaaS público, pero debe diseñarse con permisos, roles y modularidad desde el día 1.

---

## 3. Stack técnico obligatorio

Frontend:

- Next.js
- React
- TypeScript
- Chakra UI
- Plotly para gráficos
- Lucide React para iconos
- TanStack Table para tablas avanzadas
- React Hook Form
- Zod para validación

Backend:

- Next.js API Routes o Server Actions, según convenga
- Prisma ORM
- NeonDB PostgreSQL
- Servicios desacoplados para lógica de negocio
- Importadores CSV por tipo de archivo

Base de datos:

- NeonDB PostgreSQL
- Tablas normalizadas
- Tablas de control de importación
- Posibilidad futura de vistas/materialized views para dashboards rápidos

---

## 4. Principios obligatorios de desarrollo

1. Modularidad estricta.
2. No mezclar lógica de negocio dentro de componentes React.
3. Componentes reutilizables.
4. Servicios desacoplados.
5. Nombres claros en tablas, modelos, variables y funciones.
6. Pensar desde el inicio en roles y permisos.
7. Evitar deuda técnica temprana.
8. Validar siempre los datos importados.
9. Mantener trazabilidad de cargas CSV.
10. Diseñar pensando en crecimiento futuro.

---

## 5. Estructura funcional de la aplicación

La app debe contener estos módulos:

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
11. Configuración

---

## 6. Fuentes de datos CSV

La aplicación debe cargar 5 tipos de CSV.

### 6.1. Salidas Generales

Origen: Expowin → Albaranes detallados → Serie 0/17.

Columnas conocidas:

- Empresa
- Serie
- Fecha
- Numero
- Ejercicio
- Tienda
- Nombre Tienda
- Cliente
- Nombre Cliente
- Línea
- Artículo
- Descripción
- Descripción2
- RefProv
- Almacén
- Cantidad
- Precio
- Total
- Montador
- VeAlmacen
- DFamil_N1
- Tienda.
- Serie
- Doc.
- Numero
- NUMERO_PED
- Línea
- Fecha_Doc
- Cliente
- Artículo
- Descripción
- Suma Cantidad
- Suma Ventas BI
- COD_Y_PROVEEDOR
- COD_Y_MARCA
- Vendedor
- Imp.Bruto
- Descuentos
- Base Imp.
- IVA
- Imp.IVA
- Rec.
- Imp.Recargo
- Subtotal
- TOTAL ALB

Uso:

- Salidas por tienda.
- Salidas por proveedor/fabricante.
- Salidas por marca.
- Salidas por montador.
- Salidas por vendedor si viene informado.
- Cruce con incidencias mediante albarán.

---

### 6.2. Salidas Fabricante

Origen: OAS → pestaña salidas.

Columnas conocidas:

- Almacen
- DFamil_N1
- Tienda.
- Serie
- Doc.
- Numero
- NUMERO_PED
- Línea
- Fecha_Doc
- Cliente
- Artículo
- Descripción
- Suma Cantidad
- Suma Ventas BI
- COD_Y_PROVEEDOR
- COD_Y_MARCA

Uso:

- Salidas por proveedor.
- Salidas por marca.
- Ratios de incidencia por fabricante.
- Análisis por familia, tienda y proveedor.

---

### 6.3. Incidencias

Columnas conocidas:

- Clase Incidencia
- Numero
- Estado
- Tipo Estado
- Fecha
- Tienda
- Nombre Tienda
- Proveedor
- Nombre Proveedor
- Marca
- Teléfono
- Fax
- Duración Abierta
- Cliente
- Nombre Cliente
- Teléfono
- Camion
- Vendedor
- Nombre Vendedor
- Ejercicio Pedido
- Serie Pedido
- Pedido
- Referencia
- Ejercicio Albarán
- Serie Albarán
- Albarán
- Artículo
- Descripción
- Descripción2
- Referencia
- Cantidad
- Tipo
- Gravedad
- Última Recepción
- Resuelto
- Fecha Resuelto
- Solución
- Fecha de Alta
- Gastos Asociados
- Coste

Regla principal:

- Si `Resuelto = S`, la incidencia está finalizada.
- Si `Resuelto = N`, la incidencia está abierta.

Uso:

- Tabla maestra de postventa.
- KPIs de abiertas/finalizadas.
- Informes por tienda, proveedor, marca, vendedor, tipo, gravedad y coordinador.

---

### 6.4. Salidas por Vendedor

Columnas conocidas:

- Vendedor
- Vendedor
- Empresa
- Serie
- Numero
- Ejercicio
- Fecha
- Fecha Serv.
- Cliente
- Nombre
- Tienda
- Imp.Bruto
- Descuentos
- Base Imp.
- Imp. IVA
- Recargo
- Total
- Usuario Alta
- Fecha Alta

Nota técnica:

El CSV tiene dos columnas llamadas `Vendedor`. El importador debe renombrarlas como:

- `seller_code`
- `seller_name`

Uso:

- Salidas por vendedor.
- Importe vendido por vendedor.
- Ratio de incidencias por vendedor.

---

### 6.5. Salidas por Montador

Columnas conocidas:

- Montador
- Montador
- Empresa
- Serie
- Numero
- Ejercicio
- Fecha
- Fecha Serv.
- Cliente
- Nombre
- Tienda
- Imp.Bruto
- Descuentos
- Base Imp.
- Imp. IVA
- Recargo
- Total
- Usuario Alta
- Fecha Alta

Nota técnica:

El CSV tiene dos columnas llamadas `Montador`. El importador debe renombrarlas como:

- `installer_code`
- `installer_name`

Uso:

- Salidas por montador.
- Importe gestionado por montador.
- Ratio de incidencias por montador.

---

## 7. Claves y reglas de cruce

### 7.1. Clave de albarán para salidas

Para salidas, no usar únicamente `Numero`.

Crear una clave técnica:

```text
delivery_key = empresa + '-' + ejercicio + '-' + serie + '-' + numero
```

### 7.2. Clave de albarán para incidencias

En incidencias:

```text
incident_delivery_key = ejercicio_albaran + '-' + serie_albaran + '-' + albaran
```

Si la empresa no viene en incidencias, permitir cruce parcial por:

```text
ejercicio_albaran + serie_albaran + albaran
```

o mapear empresa por tienda si fuera necesario.

### 7.3. Incidencias sin albarán

Debe permitirse guardar incidencias sin albarán.

Estas incidencias deben marcarse como no cruzadas, pero no deben bloquear la importación.

### 7.4. Salida no encontrada

Si una incidencia tiene albarán pero no se encuentra en salidas:

- Guardar la incidencia igualmente.
- Marcar `unmatched_delivery = true`.
- Mostrarla en informe de calidad de datos.

---

## 8. Coordinadores

El coordinador no viene en el CSV de incidencias.

Debe existir una sección de configuración para coordinadores y reglas de asignación.

Regla MVP:

```text
Tienda → Coordinador
```

Regla avanzada futura:

```text
Tienda + Proveedor + Marca + Tipo Incidencia + Gravedad → Coordinador
```

La tabla de reglas debe permitir prioridad para resolver conflictos.

---

## 9. Informes requeridos

La app debe permitir generar informes filtrables por:

- Fecha desde / hasta
- Estado resuelto/no resuelto
- Tienda
- Coordinador
- Proveedor
- Marca
- Vendedor
- Montador
- Tipo
- Gravedad

Informes principales:

1. Informe general postventa.
2. Informe por coordinador.
3. Informe por tienda.
4. Informe por proveedor/fabricante.
5. Informe por marca.
6. Informe por vendedor.
7. Informe por montador.
8. Informe de calidad de datos.

---

## 10. Dashboard requerido

El dashboard principal debe incluir:

Cards KPI:

- Incidencias abiertas
- Incidencias finalizadas
- Ratio de resolución
- Coste total
- Gastos asociados
- Media de días abiertas
- Incidencias críticas

Gráficos Plotly:

- Donut: abiertas vs finalizadas.
- Barras: incidencias por tienda.
- Barras horizontales: ranking proveedores.
- Línea: evolución temporal.
- Heatmap: tienda vs proveedor.
- Barras apiladas: tipo/gravedad por proveedor.
- Ranking coordinadores con más abiertas.

Tablas:

- Incidencias abiertas críticas.
- Incidencias sin cruce de albarán.
- Top proveedores por ratio de incidencia.

---

## 11. Iconografía Lucide recomendada

Usar Lucide React con iconos como:

- AlertTriangle
- CheckCircle2
- Clock
- Factory
- Store
- UserRound
- Truck
- BarChart3
- FileText
- UploadCloud
- Settings
- Filter
- Download
- Search
- Database
- ClipboardList
- ShieldCheck

---

## 12. Servicios backend obligatorios

Crear servicios desacoplados:

```text
src/services/importService.ts
src/services/normalizationService.ts
src/services/dashboardService.ts
src/services/reportService.ts
src/services/coordinatorAssignmentService.ts
src/services/csvValidationService.ts
src/services/dataQualityService.ts
```

Responsabilidades:

### importService

- Recibir archivos CSV.
- Detectar tipo.
- Parsear contenido.
- Crear lote de importación.
- Enviar filas al validador.
- Insertar datos normalizados.

### normalizationService

- Normalizar tiendas.
- Normalizar proveedores.
- Normalizar marcas.
- Normalizar vendedores.
- Normalizar montadores.
- Resolver alias.

### dashboardService

- Calcular KPIs.
- Consultar agregados.
- Preparar datos para Plotly.

### reportService

- Construir informes dinámicos.
- Aplicar filtros.
- Agrupar datos.
- Preparar exportaciones futuras.

### coordinatorAssignmentService

- Buscar reglas activas.
- Aplicar prioridad.
- Asignar coordinador a incidencia.

### csvValidationService

- Validar columnas obligatorias.
- Validar tipos.
- Detectar fechas inválidas.
- Detectar importes incorrectos.
- Detectar duplicados.

### dataQualityService

- Detectar incidencias sin albarán.
- Detectar incidencias con albarán no encontrado.
- Detectar proveedores sin normalizar.
- Detectar vendedores/montadores duplicados.

---

## 13. UX obligatoria

La interfaz debe ser:

- Rápida.
- Intuitiva.
- Operativa.
- Pensada para dirección y coordinadores.
- Densa en datos pero legible.
- Con filtros persistentes.
- Con acciones claras.
- Con feedback visual en cargas CSV.

Evitar:

- Pantallas decorativas sin utilidad.
- Gráficos sin capacidad de filtrar.
- Tablas lentas.
- Formularios ambiguos.
- Lógica escondida en frontend.

---

## 14. Pantallas mínimas MVP

### Dashboard Postventa

Resumen ejecutivo y operativo.

### Incidencias

Tabla avanzada con filtros y detalle.

### Cargas CSV

Importador por tipo de archivo con validación y resultado.

### Informes

Constructor de informes filtrables.

### Coordinadores

Configuración de coordinadores y reglas de asignación.

### Catálogos

Tiendas, proveedores, marcas, vendedores y montadores.

---

## 15. Seguridad y permisos

Aunque la app sea interna, implementar roles desde el inicio.

Roles recomendados:

- admin
- direccion
- coordinador_postventa
- importador
- consulta

Reglas base:

- Solo admin puede gestionar usuarios y configuración global.
- Admin e importador pueden cargar CSV.
- Dirección puede ver todos los informes.
- Coordinador puede ver sus incidencias asignadas.
- Consulta solo puede visualizar.

---

## 16. Reglas de implementación

Cuando generes código:

1. No improvises nombres de columnas si ya existen en este documento.
2. No borres columnas originales: guarda `raw_payload` JSONB cuando sea útil.
3. Crea validadores Zod para cada tipo de CSV.
4. Crea normalizadores separados.
5. Crea índices para campos usados en filtros.
6. Prepara la app para datos históricos grandes.
7. Usa paginación server-side en tablas grandes.
8. Usa queries agregadas para dashboards.
9. No uses datos mock en servicios finales salvo seeds o demos claramente separadas.
10. Documenta las decisiones técnicas relevantes.

---

## 17. Prioridad de construcción

Construir por fases:

### Fase 1

- Proyecto base.
- Conexión NeonDB.
- Prisma.
- Modelo de datos.
- Importador CSV básico.
- Carga de incidencias.
- Carga de salidas generales.

### Fase 2

- Dashboard mínimo.
- Tabla de incidencias.
- Filtros principales.
- KPIs abiertas/finalizadas.

### Fase 3

- Coordinadores.
- Reglas de asignación.
- Informes por coordinador.

### Fase 4

- Ratios contra salidas.
- Informes por tienda, proveedor, vendedor y montador.

### Fase 5

- Exportación PDF/Excel.
- Alertas.
- Data quality dashboard.
- Materialized views si hay volumen alto.

---

## 18. Definición de éxito del MVP

El MVP se considera correcto si permite:

1. Cargar CSV de incidencias.
2. Cargar CSV de salidas.
3. Normalizar tiendas, proveedores, marcas, vendedores y montadores.
4. Ver incidencias abiertas y finalizadas.
5. Filtrar por tienda, proveedor, marca, vendedor, montador y coordinador.
6. Asignar coordinadores mediante reglas.
7. Generar informes básicos.
8. Calcular ratios incidencias/salidas.
9. Detectar datos no cruzados.
10. Mostrar gráficos Plotly útiles para dirección.
