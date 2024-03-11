const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wnabcnsdmnxybzgpggqh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWJjbnNkbW54eWJ6Z3BnZ3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTg2OTgsImV4cCI6MjAyNTM5NDY5OH0.f4wSlaCmIH-Ld0SlV4ibUcCPIPt_6dPG5uv5c2RD_a4'; // Use the appropriate API key here
const SCHEMA_NAME = 'public';  

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { db: { schema: SCHEMA_NAME } });

module.exports;