import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://dxksmffisebwrpjlcxff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4a3NtZmZpc2Vid3JwamxjeGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjMxMDIsImV4cCI6MjA2NjQzOTEwMn0.WCfWAtx9tPQH9N2lygdbaHUebIRilk5BbKR1dTY7wAk';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };