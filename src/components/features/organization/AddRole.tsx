import { useForm } from "../../../hooks/useForm";
import { createOrganizationPerson } from "../../../services/organizationService";
import styles from "../Features.module.css";

interface AddRoleProps {
  onCreated: () => void;
}

export function AddRole({ onCreated }: AddRoleProps) {
  const { values, errors, message, update, handleSubmit } = useForm(
    {
      firstName: "",
      lastName: "",
      role: "",
    },
    createOrganizationPerson,
    onCreated,
  );

  return (
    <section className={styles.input}>
      <h2>Add Person to Organization</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="role-first-name">First Name: </label>
          <input
            id="role-first-name"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={(event) => update("firstName", event.target.value)}
          />
          {errors.firstName && (
            <p className={styles.error} role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role-last-name">Last Name: </label>
          <input
            id="role-last-name"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={(event) => update("lastName", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role-title">Role: </label>
          <input
            id="role-title"
            name="role"
            type="text"
            value={values.role}
            onChange={(event) => update("role", event.target.value)}
          />
          {errors.role && (
            <p className={styles.error} role="alert">
              {errors.role}
            </p>
          )}
        </div>

        <button type="submit">Add Person</button>
        {message && <p role="status">{message}</p>}
      </form>
    </section>
  );
}