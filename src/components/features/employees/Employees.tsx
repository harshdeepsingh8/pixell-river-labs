import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { getDepartments } from "../../../repositories/employeeRepo";
import { createEmployee } from "../../../services/employeeService";
import styles from "../Features.module.css";

export function Employees() {
  const [departments, setDepartments] = useState(getDepartments);

  const { values, errors, message, update, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      departmentId: "",
    },
    createEmployee,
    () => setDepartments(getDepartments()),
  );

  return (
    <>
      <section>
        <h1>Employees by Department</h1>

        {departments.map((department) => (
          <section key={department.id}>
            <h2>{department.name}</h2>
            <ul className={styles.employees}>
              {department.employees.map((employee) => (
                <li key={employee.id}>
                  {employee.firstName} {employee.lastName}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section className={styles.input}>
        <h2>Add New Employee</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="employee-first-name">First Name: </label>
            <input
              id="employee-first-name"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={(event) =>
                update("firstName", event.target.value)
              }
            />
            {errors.firstName && (
              <p className={styles.error} role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="employee-last-name">Last Name: </label>
            <input
              id="employee-last-name"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={(event) =>
                update("lastName", event.target.value)
              }
            />
          </div>

          <div>
            <label htmlFor="employee-department">Department: </label>
            <select
              id="employee-department"
              name="departmentId"
              value={values.departmentId}
              onChange={(event) =>
                update("departmentId", event.target.value)
              }
            >
              <option value="">-- Select Department --</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className={styles.error} role="alert">
                {errors.departmentId}
              </p>
            )}
          </div>

          <button type="submit">Add Employee</button>
          {message && <p role="status">{message}</p>}
        </form>
      </section>
    </>
  );
}