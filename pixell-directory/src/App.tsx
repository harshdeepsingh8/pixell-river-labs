import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { DepartmentSection } from "./components/DepartmentSection";
import departmentData from "./data/departments.json";
import type { Department } from "./types/Employee";
import "./App.css";

const departments: Department[] = departmentData;

function App() {
  return (
    <>
      <Header />

      <main className="directory">
        <h2>Our Departments</h2>

        <div className="department-grid">
          {departments.map((department, index) => (
            <DepartmentSection
              key={department.name}
              department={department}
              headingId={`department-${index}`}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;