import { Router } from "express";
import {
  addEmployee,
  addOrganizationPerson,
  listDepartments,
  listRoles,
} from "../controllers/directoryController";

export const directoryRoutes = Router();

directoryRoutes.get("/departments", listDepartments);
directoryRoutes.post("/employees", addEmployee);
directoryRoutes.get("/roles", listRoles);
directoryRoutes.post("/roles", addOrganizationPerson);
