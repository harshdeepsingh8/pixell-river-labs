import { employeeRepo } from "../../../apis/employeeRepo";
import styles from "../Features.module.css";

/**
 * Displays leadership roles and their employee details.
 * Data is retrieved through employeeRepo so this component
 * does not directly access the underlying test data.
 */
export function Organization() {
  const roles = employeeRepo.getRoles();

  return (
    <section>
      <h1>Leadership and Management</h1>

      <table className={styles.table}>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className={styles.roleName}>
                {role.title}
              </td>

              <td>
                {role.employee?.firstName} {role.employee?.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}