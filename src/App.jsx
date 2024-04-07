import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { supabase } from "./supabase/Client";

export default function App() {

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
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </main>
  )
}
