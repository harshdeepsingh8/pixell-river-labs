import type { Department } from "../types/Employee";

interface DepartmentSectionProps {
  department: Department;
  headingId: string;
}

export function DepartmentSection({
  department,
  headingId,
}: DepartmentSectionProps) {
  return (
    <section className="department" aria-labelledby={headingId}>
      <h3 id={headingId}>{department.name}</h3>

      <ul>
        {department.employees.map((employee, index) => (
          <li key={index}>
            {[employee.firstName, employee.lastName]
              .filter(Boolean)
              .join(" ")}
          </li>
        ))}
      </ul>
    </section>
  );
}