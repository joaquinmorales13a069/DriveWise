
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://armgkpynwxqrhtelaezh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybWdrcHlud3hxcmh0ZWxhZXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyOTE5MzEsImV4cCI6MjAyNzg2NzkzMX0.u4EY6fEWP9vwCDzTIC-R2Izs1T6Rv9gQJQls06khvb8')

