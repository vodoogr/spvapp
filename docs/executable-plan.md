# Plan para hacer la app ejecutable

La aplicacion nace como Next.js desplegable en Vercel, pero puede empaquetarse como ejecutable de escritorio cuando el MVP web este estable.

## Opcion recomendada

Tauri como contenedor de escritorio.

Motivos:

- Binarios mas ligeros que Electron.
- Buen encaje para una app interna con UI web y backend remoto.
- Permite distribuir instaladores para Windows sin duplicar la interfaz.

## Fases

1. Estabilizar MVP web con Next.js, Prisma y NeonDB.
2. Definir autenticacion y permisos reales.
3. Confirmar si el ejecutable debe funcionar online, offline o mixto.
4. Crear wrapper Tauri apuntando a la app Next.
5. Preparar instalador Windows firmado si el despliegue interno lo requiere.

## Decision pendiente

El punto importante sera decidir si el ejecutable solo abre la app remota o si debe incluir cache/local database. Para CHS, la primera version deberia ser online para evitar duplicar datos postventa en equipos locales.

