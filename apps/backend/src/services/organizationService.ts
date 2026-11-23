import { Guid } from "guid-typescript";
import {
  createRole,
  getRoles,
  updateRole,
} from "../repositories/organizationRepo";
import type { FormErrors, FormResult } from "../types/form";
import type { Role } from "../types/role";

export interface OrganizationInput {
  firstName: string;
  lastName: string;
  role: string;
}

function normalizeRole(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateOrganization(
  values: OrganizationInput,
): FormErrors {
  const errors: FormErrors = {};

  if (values.firstName.trim().length < 3) {
    errors.firstName = "First name must contain at least 3 characters.";
  }

  if (!values.role.trim()) {
    errors.role = "Enter a role.";
  } else {
    const occupied = getRoles().some(
      (item) =>
        normalizeRole(item.title) === normalizeRole(values.role) &&
        item.employee !== undefined,
    );

    if (occupied) {
      errors.role = "This role already exists and is occupied.";
    }
  }

  return errors;
}

export function createOrganizationPerson(
  values: OrganizationInput,
): FormResult<Role> {
  const errors = validateOrganization(values);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const employee = {
    id: Guid.create().toString(),
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
  };

  const vacantRole = getRoles().find(
    (item) =>
      normalizeRole(item.title) === normalizeRole(values.role) &&
      item.employee === undefined,
  );

  if (vacantRole) {
    const updated = updateRole(vacantRole.id, { employee });

    if (!updated) {
      return {
        success: false,
        errors: { role: "Role no longer exists. Please try again." },
      };
    }

    return { success: true, data: updated };
  }

  const created = createRole({
    title: values.role.trim().replace(/\s+/g, " "),
    employee,
  });

  return { success: true, data: created };
}