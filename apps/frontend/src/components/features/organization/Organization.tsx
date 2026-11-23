import { useEffect, useState } from "react";
import { getRoles } from "../../../repositories/organizationRepo";
import type { Role } from "../../../types/role";
import { AddRole } from "./AddRole";
import styles from "../Features.module.css";

export function Organization() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    getRoles()
      .then(setRoles)
      .catch(() => setLoadError("Could not load roles."));
  }, []);

  async function refreshRoles() {
    setRoles(await getRoles());
    setLoadError("");
  }

  return (
    <>
      <section>
        <h1>Leadership and Management</h1>
        {loadError && <p role="alert">{loadError}</p>}

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Employee</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td className={styles.roleName}>{role.title}</td>
                <td>
                  {role.employee
                    ? `${role.employee.firstName} ${role.employee.lastName ?? ""}`.trim()
                    : "Vacant"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AddRole onCreated={refreshRoles} />
    </>
  );
}