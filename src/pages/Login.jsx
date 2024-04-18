import { supabase } from "../supabase/Client"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useState, useEffect } from 'react'
import App from "../App"
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        navigate('https://google.com'); // Redirect to addcar if there's a session
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        navigate('addcar'); // Redirect to addcar on auth state change if there's a session
      }
    });

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]}/>)
  }
  else {
    return (<App />)
  }
}