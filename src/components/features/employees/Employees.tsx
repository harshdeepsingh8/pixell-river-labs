import { useState } from "react";
import { departmentData } from "../../../data/departments";
import styles from "../Features.module.css";
import { Guid } from "guid-typescript";

export function Employees() {
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [formMessages, setFormMessages] = useState<string[]>([])
    const [departmentInput, setDepartmentInput] = useState("");
    const [departmentList, setDepartmentList] = useState(departmentData);

    const departmentListElement = departmentList.map((d) => {
        return <section key={d.id}>
            <h2>{d.name}</h2>
            <ul className={styles.employees}>
                {d.employees.map((e) => <li key={e.id}>
                    {e.firstName} {e.lastName}
                </li>)}
            </ul>
        </section>
    });

    const departmentDropdownInput = (
            <select
                value={departmentInput}
                onChange={e => setDepartmentInput(e.target.value)}
            >
                <option value="">-- Select Department --</option>
                {
                    departmentData.map(d => {
                        return(
                            <option 
                                key={"opt" + d.id} 
                                value={d.name}>
                                    {d.name}
                                </option>
                        );
                    })
                }
            </select>
    );

    const handleEmployeeSubmit = () => {
        let isValid = true;
        setFormMessages([]);

        if(firstNameValue.trim().length < 3) {
            isValid = false;
            setFormMessages(s => {
                return [...s, "First names must have at least three characters."]
            });
        }

        if(!departmentData.find(d => d.name === departmentInput)) {
            isValid = false;

            setFormMessages(s => {
                return [...s, "Employee must be in an existing department."]
            })
        }

        if(isValid) {
            setFirstNameValue("");
            setLastNameValue("");

            setDepartmentList(oldState => oldState.map(d => {
                if(d.name !== departmentInput) {
                    return d;
                } else {
                    // must create a deep clone of the department object being updated
                    return {
                        id: d.id,
                        name: d.name,
                        employees: [...d.employees,
                            {
                                id: Guid.create().toString(),
                                firstName: firstNameValue,
                                lastName: lastNameValue
                            }

                        ]
                    };
                }
            }));
        }
    }

    return(<>
        <section>
            <h1>Employees by Department</h1>
            {departmentListElement}
        </section>
        <section className={styles.input}>
            <h2>Add New Employee</h2>
            <form onSubmit={e => {
                e.preventDefault();
                handleEmployeeSubmit();
                }
            }>
                <div>
                    <label>
                        First Name: <input 
                            name="firstName" 
                            type="text" 
                            value = {firstNameValue}
                            onChange={e => setFirstNameValue(e.target.value)}
                        /> 
                    </label>
                </div>
                <div>
                    <label>
                        Last Name: <input 
                            name="lastName" 
                            type="text" 
                            value = {lastNameValue}
                            onChange={e => setLastNameValue(e.target.value)}
                            />
                    </label>
                </div>
                <div>
                    <label>
                        Department: 
                            {departmentDropdownInput}
                    </label>
                </div>
                <div>
                    {
                        formMessages.map(message => {
                            return <p 
                                className={styles.error}
                                >
                                    {message}
                                </p>    
                            }
                        )
                    }
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </section>
    </>);
}