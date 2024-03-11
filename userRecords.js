const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const userRecord = async (email, username) => {
    try {
        // Create a new record in your custom user table and associate it with the user's email and UID
        await prisma.user.create({
            data: {
                // userId, // Store the UID from Supabase authentication in the userId field of your custom user table
                email:email,
                name: username
                // Add any other relevant user data
            }
        });
        // console.log('Custom user record created for userId:', userId);
    } catch (error) { 
        console.error('Error creating custom user record:', error.message);
        throw error;
    }
};

module.exports = { userRecord };
