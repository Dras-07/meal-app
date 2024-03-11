const { createClient } = require('@supabase/supabase-js');
const { userRecord } = require('./userRecords.js');
const supabaseUrl = 'https://wnabcnsdmnxybzgpggqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWJjbnNkbW54eWJ6Z3BnZ3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTg2OTgsImV4cCI6MjAyNTM5NDY5OH0.f4wSlaCmIH-Ld0SlV4ibUcCPIPt_6dPG5uv5c2RD_a4'; // Use the appropriate API key here
const supabase = createClient(supabaseUrl, supabaseKey);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const signUpUser = async (email, username, password) => {
    try {
        const { user, error } = await supabase.auth.signUp({ 
email: email,
password : password
});
        if (error) {
            console.log(error.message);
            throw error;
        }
        
       await userRecord(email, username); 

        return user;
    } catch (error) {
        console.error('Error signing up user:', error.message);
        throw error;
    }
};

const signInUser = async (email, password) => {
    try {
        const existingUser = await prisma.supabaseAuthUser.findUnique({
            where: {
                email: email
            }
        });
           let flag=false;
        if (existingUser) {
            console.log('User already exists:', existingUser);
            flag=true;
        }

        const { data, error } = await supabase.auth.signInWithPassword({ 
            email: email, 
            password: password 
        });

        if (error) {
            throw error;
        }

       
        if(flag==false){
        const newUser = await prisma.supabaseAuthUser.create({
            data: {
                id: data.user.id,
                email: email,
            }
        });
        console.log('User added to SupabaseAuthUser table:', newUser);

    }
    return data;
        
    } catch (error) {
        console.error('Error signing in user:', error.message);
        throw error;
    }
};



const signOutUser = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        console.log('User signed out');
    } catch (error) {
        console.error('Error signing out user:', error.message);
        throw error;
    }
};


module.exports = { signUpUser, signInUser, signOutUser };
