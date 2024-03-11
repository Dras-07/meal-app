const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wnabcnsdmnxybzgpggqh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWJjbnNkbW54eWJ6Z3BnZ3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTg2OTgsImV4cCI6MjAyNTM5NDY5OH0.f4wSlaCmIH-Ld0SlV4ibUcCPIPt_6dPG5uv5c2RD_a4'; // Replace with your Supabase anonymous key
const SCHEMA_NAME = 'public'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { db: { schema: SCHEMA_NAME } });

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization; 

    if (!token) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const { data: user, error } = await supabase.auth.getUser(token.replace('Bearer ', ''));
 
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid session token' });
    }

    req.user = user;
    return res.status(201);
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = isAuthenticated;
