import { Outlet } from "react-router-dom";
import SideBar from "@/components/AdminDashboard/SideBar.jsx";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/Client";

export default function DashboardAdmin() {

  const navigate = useNavigate()

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
        if(!session){
          navigate('/login')
        }else{
          console.log('Initial Session detected')
          checkUserRole(session.user.id);
        }
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        checkUserRole(session.user.id);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        navigate('/')
      }
    });

    // call unsubscribe to remove the callback
    
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function checkUserRole(user_id) {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role_name')
      .eq('user_id', user_id)
      .single();

    console.log(roles)

    if (error || !roles) {
      console.error('Error fetching role or no role found', error);
      navigate('/login')
      
      return;
    }

    if (roles.role_name === 'admin') {
      navigate('/admin-dashboard');
    } else if (roles.role_name === 'user') {
      navigate('/user-dashboard');
    } else {
      // Fallback to login if no appropriate role is found
      navigate('/login')
    }
  }

  // handle Log Out button

  async function handleLogOut () {
    const { error } = await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <section className={"flex bg-neutral-100 h-screen w-screen"}>
      <SideBar logOut={handleLogOut}/>
      <div className="p-8 w-full">
        <Outlet />
      </div>
    </section>
  );
}
