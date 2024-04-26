import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardAdmin from "./pages/DashboardAdmin";
import CarsTable from "./components/AdminDashboard/CarsTable";
import UserTable from "./components/AdminDashboard/UserTable";

export default function App() {

  


  return (
    <main className={'font-roboto'}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/admin-dashboard" element={<DashboardAdmin />}>
          <Route path="cars" element={<CarsTable />}/>
          <Route path="users" element={<UserTable />}/>
        </Route>
      </Routes>
    </main>
  )
}
