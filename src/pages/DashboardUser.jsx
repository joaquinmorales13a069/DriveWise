import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/Client';

import Sidebar from "../components/UserDashboard/SideBar";
import UserInfo from "../components/UserDashboard/UserInfo";
import Bookings from "../components/UserDashboard/Bookings";

export default function DashboardUser() {

  const navigate = useNavigate();
  const [session, setSession] = useState(null)

  // useEffect used to verify if there is any session active as well as retrieve the user_role and provide access to corresponding dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    navigate('/login')
  }
  else {
    checkUserRole(session.user.id);
  }


  async function checkUserRole(user_id) {
    const { data: roles, error } = await supabase
      .from('user_roles')
      .select('role_name')
      .eq('user_id', user_id)
      .single();

    if (error || !roles) {
      console.error('Error fetching role or no role found', error);
      navigate('/login');
      return;
    }

    if (roles.role_name === 'admin') {
      navigate('/admin-dashboard');
    } else if (roles.role_name === 'user') {
      navigate('/user-dashboard');
    } else {
      // Fallback to login if no appropriate role is found
      navigate('/login');
    }
  }

  return (
    <div>
      <div>
        <h1>User Dashboard</h1>
      </div>
      <Sidebar />
      {/* Any additional content for the Home page can go here */}
    </div>
  );
}
