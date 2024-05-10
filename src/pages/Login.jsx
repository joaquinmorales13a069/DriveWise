import Navbar from "@/components/Navbar";
import { supabase } from "../supabase/Client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/"); // Redirect to home if there's a session
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/"); // Redirect to home on auth state change if there's a session
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <section className="flex flex-col items-center gap-10 container mx-auto px-4 py-8">
    <Navbar/>
    <div className="flex-col justify-center w-3/5">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]} // Add appropriate social providers if any, e.g., ['google', 'facebook']
      />
    </div>
    </section>
  );
}
