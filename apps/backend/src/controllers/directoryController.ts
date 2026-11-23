import type { Request, Response } from "express";
import { getDepartments } from "../repositories/employeeRepo";
import { getRoles } from "../repositories/organizationRepo";
import { createEmployee } from "../services/employeeService";
import { createOrganizationPerson } from "../services/organizationService";

export function listDepartments(_req: Request, res: Response) {
  res.json(getDepartments());
}

export function listRoles(_req: Request, res: Response) {
  res.json(getRoles());
}

export function addEmployee(req: Request, res: Response) {
  const { firstName, lastName = "", departmentId } = req.body ?? {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof departmentId !== "string"
  ) {
    res.status(400).json({
      success: false,
      errors: { form: "Enter a first name and select a department." },
    });
    return;
  }

  const result = createEmployee({ firstName, lastName, departmentId });
  res.status(result.success ? 201 : 400).json(result);
}

export function addOrganizationPerson(req: Request, res: Response) {
  const { firstName, lastName = "", role } = req.body ?? {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof role !== "string"
  ) {
    res.status(400).json({
      success: false,
      errors: { form: "Enter a first name and role." },
    });
    return;
  }

  const result = createOrganizationPerson({ firstName, lastName, role });
  res.status(result.success ? 200 : 400).json(result);
}
