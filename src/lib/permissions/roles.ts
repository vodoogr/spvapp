import type { UserRole } from "@/types/domain";

export type Permission =
  | "dashboard:read"
  | "incidents:read"
  | "incidents:manage"
  | "imports:create"
  | "reports:read"
  | "coordinators:manage"
  | "catalogs:manage"
  | "settings:manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "dashboard:read",
    "incidents:read",
    "incidents:manage",
    "imports:create",
    "reports:read",
    "coordinators:manage",
    "catalogs:manage",
    "settings:manage",
  ],
  direccion: ["dashboard:read", "incidents:read", "reports:read"],
  coordinador_postventa: ["dashboard:read", "incidents:read", "incidents:manage", "reports:read"],
  importador: ["dashboard:read", "incidents:read", "imports:create", "reports:read"],
  consulta: ["dashboard:read", "incidents:read", "reports:read"],
};

export function can(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

