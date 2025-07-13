import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fcaqazjhuryjlybubjmy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjYXFhempodXJ5amx5YnViam15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTc3ODcsImV4cCI6MjA2NzczMzc4N30.cGjxr7D0xXgQiq5hnzRGmpUOatiSaIngCRdiTvVjQb8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)