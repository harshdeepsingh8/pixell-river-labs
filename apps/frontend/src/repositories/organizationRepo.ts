import type { FormResult } from "../types/form";
import type { Role } from "../types/role";

const api = "http://127.0.0.1:3001/api";

export async function getRoles(): Promise<Role[]> {
  const response = await fetch(`${api}/roles`);
  if (!response.ok) throw new Error("Could not load roles.");
  return response.json();
}

export async function createOrganizationPerson(input: {
  firstName: string;
  lastName: string;
  role: string;
}): Promise<FormResult<Role>> {
  const response = await fetch(`${api}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok && response.status !== 400) {
    throw new Error("Could not add person.");
  }

  return response.json();
}