import type { Department } from "../types/department";
import type { Employee } from "../types/employee";
import type { FormResult } from "../types/form";

const api = "http://127.0.0.1:3001/api";

export async function getDepartments(): Promise<Department[]> {
  const response = await fetch(`${api}/departments`);
  if (!response.ok) throw new Error("Could not load departments.");
  return response.json();
}

export async function createEmployee(input: {
  firstName: string;
  lastName: string;
  departmentId: string;
}): Promise<FormResult<Employee>> {
  const response = await fetch(`${api}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok && response.status !== 400) {
    throw new Error("Could not add employee.");
  }

  return response.json();
}