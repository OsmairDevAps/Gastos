import { createClient } from '@supabase/supabase-js'

// const url = process.env.EXPO_PUBLIC_SUPABASE_URL!
// const key = process.env.EXPO_PUBLIC_SUPABASE_KEY!

// export const supabase = createClient(url, key)
export const supabase = createClient(
  'https://aedsaxxtkbhvydlumlia.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZHNheHh0a2JodnlkbHVtbGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDY4MTQsImV4cCI6MjA1ODQ4MjgxNH0.SXDNnQGJ0ovidmPcTBNvrIR-p6dsiJJkpyDmEURkoiY'
)