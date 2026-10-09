import { Guid } from "guid-typescript";
import { departmentData } from "../data/departments";
import type { Department } from "../types/department";
import type { Employee } from "../types/employee";
import { roleData } from "../data/roles";

// Temporary data shared across repository calls.
// This resets to the original data when the browser refreshes.
const departments: Department[] = structuredClone(departmentData);

export const employeeRepo = {
      // Return leadership roles and their associated employee details.
  getRoles() {
    return structuredClone(roleData);
  },
  // Return all departments and their employees.
  // Return a copy so components cannot change stored data directly.
  getDepartments(): Department[] {
    return structuredClone(departments);
  },

  // Return one department using its ID.
  getDepartmentById(departmentId: string): Department | undefined {
    const department = departments.find(
      (department) => department.id === departmentId
    );

    return department ? structuredClone(department) : undefined;
  },

  // Return the employees belonging to one department.
  getEmployeesByDepartment(departmentId: string): Employee[] {
    const department = departments.find(
      (department) => department.id === departmentId
    );

    return department ? structuredClone(department.employees) : [];
  },

  // Store a new employee in the selected department.
  createEmployee(
    departmentId: string,
    employeeData: Omit<Employee, "id">
  ): Employee {
    const department = departments.find(
      (department) => department.id === departmentId
    );

    if (!department) {
      throw new Error("Department could not be found.");
    }

    const newEmployee: Employee = {
      ...employeeData,
      id: Guid.create().toString(),
    };

    department.employees.push(newEmployee);

    return structuredClone(newEmployee);
  },
};