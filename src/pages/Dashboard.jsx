import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/Client';
import SideBar from "@/components/AdminDashboard/SideBar.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null)

// USE EFFECT FOR RETRIEVING USER INFORMATION AND SESSION IF ANY
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
    <section className={'flex bg-neutral-100 h-screen w-screen'}>
      <SideBar />
      <div className="p-8 w-full">
        {/* The content that gets rendered will depend on the route */}
      </div>
    </section>
  );
}
