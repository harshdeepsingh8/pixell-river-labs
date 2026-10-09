import { useState } from "react";
import { useFormInput } from "../../../hooks/useFormInput";
import { employeeService } from "../../../services/employeeService";
import { employeeRepo } from "../../../apis/employeeRepo";
import styles from "../Features.module.css";

/**
 * Displays employees and the employee creation form.
 *
 * useFormInput manages each input's value and messages.
 * employeeService validates business rules and creates employees.
 * employeeRepo supplies department and employee data.
 *
 * Component state holds the displayed list, while the repository
 * owns the temporary data shared across the application.
 */
export function Employees() {
  const firstName = useFormInput();
  const lastName = useFormInput();
  const department = useFormInput();

  const [departmentList, setDepartmentList] = useState(() =>
    employeeRepo.getDepartments()
  );

  const [successMessage, setSuccessMessage] = useState("");

  function handleEmployeeSubmit() {
    setSuccessMessage("");

    const input = {
      firstName: firstName.value,
      lastName: lastName.value,
      departmentId: department.value,
    };

    // Each hook runs a callback and displays the service's errors.
    const firstNameValid = firstName.validate((value) => {
      return employeeService.validateEmployee({
        ...input,
        firstName: value,
      }).errors.firstName;
    });

    const lastNameValid = lastName.validate((value) => {
      return employeeService.validateEmployee({
        ...input,
        lastName: value,
      }).errors.lastName;
    });

    const departmentValid = department.validate((value) => {
      return employeeService.validateEmployee({
        ...input,
        departmentId: value,
      }).errors.departmentId;
    });

    if (!firstNameValid || !lastNameValid || !departmentValid) {
      return;
    }

    // The service validates again before storing the employee.
    const result = employeeService.createEmployee(input);

    if (!result.success) {
      firstName.setMessages(
        result.errors.firstName ? [result.errors.firstName] : []
      );

      lastName.setMessages(
        result.errors.lastName ? [result.errors.lastName] : []
      );

      department.setMessages(
        result.errors.departmentId ? [result.errors.departmentId] : []
      );

      return;
    }

    // Refresh the displayed data from the repository.
    setDepartmentList(employeeRepo.getDepartments());

    setSuccessMessage(
      `${result.employee.firstName} was added successfully.`
    );

    firstName.reset();
    lastName.reset();
    department.reset();
  }

  return (
    <>
      <section>
        <h1>Employees by Department</h1>

        {departmentList.map((item) => (
          <section key={item.id}>
            <h2>{item.name}</h2>

            <ul className={styles.employees}>
              {item.employees.map((employee) => (
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

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            handleEmployeeSubmit();
          }}
        >
          <div>
            <label htmlFor="firstName">First Name: </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName.value}
              onChange={(event) => {
                firstName.setValue(event.target.value);
                setSuccessMessage("");
              }}
              aria-invalid={firstName.messages.length > 0}
              aria-describedby="firstName-errors"
            />

            <div id="firstName-errors" aria-live="polite">
              {firstName.messages.map((message) => (
                <p key={message} className={styles.error}>
                  {message}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="lastName">Last Name: </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName.value}
              onChange={(event) => {
                lastName.setValue(event.target.value);
                setSuccessMessage("");
              }}
              aria-invalid={lastName.messages.length > 0}
              aria-describedby="lastName-errors"
            />

            <div id="lastName-errors" aria-live="polite">
              {lastName.messages.map((message) => (
                <p key={message} className={styles.error}>
                  {message}
                </p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="department">Department: </label>

            <select
              id="department"
              name="department"
              value={department.value}
              onChange={(event) => {
                department.setValue(event.target.value);
                setSuccessMessage("");
              }}
              aria-invalid={department.messages.length > 0}
              aria-describedby="department-errors"
            >
              <option value="">-- Select Department --</option>

              {departmentList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <div id="department-errors" aria-live="polite">
              {department.messages.map((message) => (
                <p key={message} className={styles.error}>
                  {message}
                </p>
              ))}
            </div>
          </div>

          <button type="submit">Add Employee</button>

          <p role="status">{successMessage}</p>
        </form>
      </section>
    </>
  );
}