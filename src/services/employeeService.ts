import { employeeRepo } from "../apis/employeeRepo";
import type { Employee } from "../types/employee";

export type EmployeeInput = {
  firstName: string;
  lastName: string;
  departmentId: string;
};

export type EmployeeErrors = {
  firstName?: string;
  lastName?: string;
  departmentId?: string;
};

export type EmployeeValidation = {
  isValid: boolean;
  errors: EmployeeErrors;
};

export type CreateEmployeeResult =
  | { success: true; employee: Employee }
  | { success: false; errors: EmployeeErrors };

function validateEmployee(input: EmployeeInput): EmployeeValidation {
  const errors: EmployeeErrors = {};

  // Business rule: first names need at least three characters.
  if (input.firstName.trim().length < 3) {
    errors.firstName = "First name must have at least three characters.";
  }

  // Business rule: employees must belong to an existing department.
  const department = employeeRepo.getDepartmentById(input.departmentId);

  if (!department) {
    errors.departmentId = "Please select an existing department.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function createEmployee(input: EmployeeInput): CreateEmployeeResult {
  // Always validate before attempting to store an employee.
  const validation = validateEmployee(input);

  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const employee = employeeRepo.createEmployee(input.departmentId, {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
  });

  return {
    success: true,
    employee,
  };
}

export const employeeService = {
  validateEmployee,
  createEmployee,
};