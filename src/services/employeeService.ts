import {
  createEmployee as saveEmployee,
  getDepartments,
} from "../repositories/employeeRepo";
import type { Employee } from "../types/employee";
import type { FormErrors, FormResult } from "../types/form";

export interface EmployeeInput {
  firstName: string;
  lastName: string;
  departmentId: string;
}

export function validateEmployee(
  values: EmployeeInput,
): FormErrors {
  const errors: FormErrors = {};

  if (values.firstName.trim().length < 3) {
    errors.firstName = "First name must contain at least 3 characters.";
  }

  const departmentExists = getDepartments().some(
    (department) => department.id === values.departmentId,
  );

  if (!departmentExists) {
    errors.departmentId = "Select an existing department.";
  }

  return errors;
}

export function createEmployee(
  values: EmployeeInput,
): FormResult<Employee> {
  const errors = validateEmployee(values);

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const employee = saveEmployee(values.departmentId, {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
  });

  return { success: true, data: employee };
}