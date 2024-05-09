import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabase/Client';
import SideBar from "@/components/AdminDashboard/SideBar.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        checkUserRole(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    // Check the initial session
    const session = supabase.auth.session;
    if (session) {
      checkUserRole(session.user.id);
    } else {
      navigate('/login');
    }

    return () => {
      authListener.unsubscribe();
    };
  }, []);

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
    }
  }

  return (
    <section className={'flex bg-neutral-100 h-screen w-screen'}>
      <div className="p-8 w-full">
        {/* The content that gets rendered will depend on the route */}
      </div>
    </section>
  );
}
