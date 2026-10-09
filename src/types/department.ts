import type { Employee } from "./employee";

export interface Department {
    id: string;
    name: string,
    employees: Employee[]
}