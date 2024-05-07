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
      </Routes>
    </main>
  )
}
