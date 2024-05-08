import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddCarForm from "./pages/AddCarForm";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/DashboardAdmin";
import CarsTable from "./components/AdminDashboard/CarsTable";
import UserTable from "./components/AdminDashboard/UserTable";
import Dashboard from "./pages/Dashboard";
import DashboardUser from "./pages/DashboardUser";

export default function App() {

  


  return (
    <main className={'font-roboto'}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/addcar" element={<AddCarForm />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/admin-dashboard" element={<DashboardAdmin />}>
          <Route path="cars" element={<CarsTable />}/>
          <Route path="users" element={<UserTable />}/>
        </Route>
        <Route path="/user-dashboard" element={<DashboardUser />}/>
      </Routes>
    </main>
  )
}
