import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddCarForm from "./pages/AddCarForm";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./supabase/Client";
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo';
import Bookings from './components/Bookings';

import DashboardAdmin from "./pages/DashboardAdmin";
import CarsTable from "./components/AdminDashboard/CarsTable";
import UserTable from "./components/AdminDashboard/UserTable";
import Dashboard from "./pages/Dashboard";
import DashboardUser from "./pages/DashboardUser";

export default function App() {
  const userData = { name: 'John Doe' };
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
    })
  
    return () => {
      
    }
  }, [])
  


  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/addcar" element={<AddCarForm />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/information" element={<UserInfo initialData={userData} />} />
            <Route path="/bookings" element={<Bookings />} />
        <Route path="/Dashboard" element={<Dashboard />}/>\
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
