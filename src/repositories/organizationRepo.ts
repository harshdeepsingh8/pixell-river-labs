import { Guid } from "guid-typescript";
import { roleData } from "../data/roles";
import type { Role } from "../types/role";

let roles: Role[] = structuredClone(roleData);

export function getRoles(): Role[] {
  return structuredClone(roles);
}

export function getRoleById(id: string): Role | undefined {
  const role = roles.find((item) => item.id === id);
  return role ? structuredClone(role) : undefined;
}

export function createRole(input: Omit<Role, "id">): Role {
  const role: Role = {
    ...structuredClone(input),
    id: Guid.create().toString(),
  };

  roles = [...roles, role];
  return structuredClone(role);
}

export function updateRole(
  id: string,
  changes: Partial<Omit<Role, "id">>,
): Role | undefined {
  const existing = roles.find((role) => role.id === id);

  if (!existing) {
    return undefined;
  }

  const updated: Role = {
    ...existing,
    ...structuredClone(changes),
  };

  roles = roles.map((role) => (role.id === id ? updated : role));

  return structuredClone(updated);
}

export function deleteRole(id: string): boolean {
  const exists = roles.some((role) => role.id === id);

  roles = roles.filter((role) => role.id !== id);

  return exists;
}