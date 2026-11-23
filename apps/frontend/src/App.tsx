import { Route, Routes } from "react-router-dom";
import { Employees } from "./components/features/employees/Employees";
import { Organization } from "./components/features/organization/Organization";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Employees />} />
        <Route path="employees" element={<Employees />} />
        <Route path="organization" element={<Organization />} />
      </Route>
    </Routes>
  );
}

export default App;