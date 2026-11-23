import pixellRiverLogo from "./pixell-river-logo.svg"
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export function Header() {
    return(
        <header className={styles.header}>
            <section className={styles.banner}>
                <a href="#">Pixell River Employee Directory</a>
                <img
                    className={styles.logo} 
                    src={pixellRiverLogo} 
                    alt="Pixell River Financial Logo"
                />
            </section>
            <nav className={styles.nav}>
                <NavLink 
                    to="employees"
                    className={({isActive}) => 
                        isActive? styles.active: ""
                    }
                >
                    Employees
                </NavLink>
                <NavLink
                    to="organization"
                    className={({isActive}) => 
                        isActive? styles.active: ""
                    }
                >
                    Organization
                </NavLink>
            </nav>
        </header>
    )
}