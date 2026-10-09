import { Route, Routes } from 'react-router-dom'
import { Employees } from './components/features/employees/Employees'
import { Layout } from './components/layout/Layout'
import { Organization } from './components/features/organization/Organization'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="employees?" index element={<Employees />} />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
