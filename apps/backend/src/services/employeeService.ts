import {
  createEmployee as saveEmployee,
  departmentExists,
} from "../repositories/employeeRepo";
import type { FormErrors, FormResult } from "../types/form";

export interface EmployeeInput {
  firstName: string;
  lastName: string;
  departmentId: string;
}

type SavedEmployee = Awaited<ReturnType<typeof saveEmployee>>;

export async function createEmployee(
  values: EmployeeInput,
): Promise<FormResult<SavedEmployee>> {
  const errors: FormErrors = {};
  const firstName = values.firstName.trim();

  if (firstName.length < 3) {
    errors.firstName = "First name must contain at least 3 characters.";
  }

  if (!(await departmentExists(values.departmentId))) {
    errors.departmentId = "Select an existing department.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const employee = await saveEmployee(values.departmentId, {
    firstName,
    lastName: values.lastName.trim() || undefined,
  });

  return { success: true, data: employee };
}