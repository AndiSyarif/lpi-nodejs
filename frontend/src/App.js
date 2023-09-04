import UserList from "./components/users/UserList";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import DetailUser from "./components/users/DetailUser";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import DetailEmployee from "./components/employee/DetailEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/edit/:id_user" element={<EditUser />} />
        <Route path="/user/detail/:id_user" element={<DetailUser />} />

        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/employee/add" element={<AddEmployee />} />
        <Route path="/employee/edit/:id_employees" element={<EditEmployee />} />
        <Route
          path="/employee/detail/:id_employees"
          element={<DetailEmployee />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
