import { departments } from "./data.js";

function displayDirectory() {
  const main = document.querySelector("#employee-directory");
  const year = document.querySelector("#current-year");

  year.textContent = new Date().getFullYear();

  const heading = document.createElement("h2");
  heading.textContent = "Our Departments";
  main.appendChild(heading);

  const departmentGrid = document.createElement("div");
  departmentGrid.className = "department-grid";

  departments.forEach((department, index) => {
    const section = document.createElement("section");
    section.className = "department";

    const departmentHeading = document.createElement("h3");
    departmentHeading.id = `department-${index}`;
    departmentHeading.textContent = department.name;

    section.setAttribute("aria-labelledby", departmentHeading.id);

    const employeeList = document.createElement("ul");

    department.employees.forEach((employee) => {
      const listItem = document.createElement("li");

      listItem.textContent = [
        employee.firstName,
        employee.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      employeeList.appendChild(listItem);
    });

    section.appendChild(departmentHeading);
    section.appendChild(employeeList);
    departmentGrid.appendChild(section);
  });

  main.appendChild(departmentGrid);
}

document.addEventListener("DOMContentLoaded", displayDirectory);