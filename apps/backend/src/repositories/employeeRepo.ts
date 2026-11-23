import { prisma } from "../db";
import type { Employee } from "../types/employee";

export function getDepartments() {
  return prisma.department.findMany({
    orderBy: { name: "asc" },
    include: { employees: { orderBy: { firstName: "asc" } } },
  });
}

export function departmentExists(id: string) {
  return prisma.department.findUnique({
    where: { id },
    select: { id: true },
  });
}

export function createEmployee(
  departmentId: string,
  input: Omit<Employee, "id">,
) {
  return prisma.employee.create({
    data: { ...input, departmentId },
  });
}