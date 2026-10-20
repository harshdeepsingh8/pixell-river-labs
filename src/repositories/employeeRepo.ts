import { Guid } from "guid-typescript";
import { departmentData } from "../data/departments";
import type { Department } from "../types/department";
import type { Employee } from "../types/employee";

let departments: Department[] = structuredClone(departmentData);

export function getDepartments(): Department[] {
  return structuredClone(departments);
}

export function createEmployee(
  departmentId: string,
  input: Omit<Employee, "id">,
): Employee {
  const department = departments.find(
    (item) => item.id === departmentId,
  );

  if (!department) {
    throw new Error("Department not found.");
  }

  const employee: Employee = {
    ...input,
    id: Guid.create().toString(),
  };

  departments = departments.map((item) =>
    item.id === departmentId
      ? {
          ...item,
          employees: [...item.employees, employee],
        }
      : item,
  );

  return structuredClone(employee);
}