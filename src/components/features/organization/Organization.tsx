import { roleData } from "../../../data/roles"; 
import styles from "../Features.module.css";

export function Organization() {
    return(<>
        <section>
            <h1>Leadership and Management</h1>
            <table className={styles.table}>
                <tbody>
                {roleData.map(r => {
                    return(
                    <tr key={r.id}>
                        <td className={styles.roleName}>
                            {r.title}
                        </td>
                        <td>
                            {r.employee?.firstName} {r.employee?.lastName}
                        </td>
                    </tr>
                )}
            )}
            </tbody>
            </table>
        </section>
    </>);
}