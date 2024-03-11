const express = require('express');
const { createClient } = require('@supabase/supabase-js');
// const { userRecord } = require('./userRecords.js');
const supabaseUrl = 'https://wnabcnsdmnxybzgpggqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWJjbnNkbW54eWJ6Z3BnZ3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTg2OTgsImV4cCI6MjAyNTM5NDY5OH0.f4wSlaCmIH-Ld0SlV4ibUcCPIPt_6dPG5uv5c2RD_a4'; // Use the appropriate API key here
// const supabase = createClient(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();
const isAuthenticated = require('../isAuthenticated'); // Import isAuthenticated middleware
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});


// GET all meals route - protected by isAuthenticated middleware
router.get('/meals', async (req, res) => {
console.log("ZZZZZ");
    console.log(req.body);
    try {
        const meals = await prisma.meal.findMany(); // Fetch all meals from the database
        console.log(req);
        res.json(meals); // Return the meals as JSON response
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send('Error fetching meals');
    }
});

// GET meals by day route - protected by isAuthenticated middleware
router.get('/meals/:day/:userId',  async (req, res) => {
    const day = req.params.day; // Extract the day parameter from the request
    const userId= req.params.userId; // Extract the userId parameter from the request
    console.log(day);
    console.log(userId);
    try {
        const meals = await prisma.meal.findMany({ // Fetch meals for the specified day
            where: {
                day: day,
                userId: userId,
            },
            include: {
                ingredients: true, // Include associated ingredients
            },
        });
        res.json(meals); // Return the meals as JSON response
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send('Error fetching meals');
    }
});



router.post('/meals', async (req, res) => {
    try {
        const token = req.headers.authorization; // Get the token from the Authorization header
        const { data: user, error } = await supabase.auth.getUser(token.replace('Bearer ', ''));

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid session token' });
        }
        // Check if the SupabaseAuthUser record exists
        const existingUser = await prisma.supabaseAuthUser.findUnique({
            where: {
                id: user.user.id
            }
        });

        if (!existingUser) {
            return res.status(404).json({ error: 'SupabaseAuthUser record not found' });
        }

        const meal = await prisma.meal.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                day: req.body.day,
                ingredients: {
                    create: req.body.ingredients.map(ingredient => ({
                        name: ingredient.name
                    }))
                },
                // Associate the meal with the user
                user: {
                    connect: {
                        id: user.user.id,
                    }
                }
            },
            include: {
                ingredients: true
            }
        });

        res.status(201).json(meal); // Return the created meal as JSON response
    } catch (error) {
        console.error('Error creating meal:', error);
        res.status(500).send('Error creating meal');
    }
});


// POST create meal route - protected by isAuthenticated middleware
// router.post('/meals', async (req, res) => {
//     try {
//         if (!req.body.ingredients || !Array.isArray(req.body.ingredients)) {
//             throw new Error('Ingredients array is missing or not properly formatted');
//         }
//         const meal = await prisma.meal.create({ // Create a new meal
//             data: {
//                 name: req.body.name,
//                 description: req.body.description,
//                 imageUrl: req.body.imageUrl,
//                 day: req.body.day,
//                 ingredients: { // Create associated ingredients
//                     create: req.body.ingredients.map(ingredient => ({
//                         name: ingredient.name
//                     }))
//                 }
//             },
//             include: {
//                 ingredients: true // Include associated ingredients in the response
//             }
//         });
//         res.status(201).json(meal); // Return the created meal as JSON response
//     } catch (error) {
//         console.error('Error creating meal:', error);
//         res.status(500).send('Error creating meal');
//     }
// });

// PUT update meal route - protected by isAuthenticated middleware
router.put('/meals/:id', async (req, res) => {
    const mealId = parseInt(req.params.id); // Parse the mealId to an integer
    const { name, description, imageUrl, ingredients } = req.body;
    try {
        const updatedMeal = await prisma.meal.update({ // Update the meal details
            where: {
                id: mealId,
            },
            data: {
                name,
                description,
                imageUrl,
                ingredients: { // Update associated ingredients
                    deleteMany: {}, // Optionally delete existing ingredients
                    create: ingredients.map(ingredient => ({
                        name: ingredient.name,
                    })),
                },
            },
            include: {
                ingredients: true, // Include associated ingredients in the response
            },
        });
        res.json(updatedMeal); // Return the updated meal as JSON response
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).send('Error updating meal');
    }
});

// DELETE meal route - protected by isAuthenticated middleware
router.delete('/meals/:id', async (req, res) => {
    const mealId = parseInt(req.params.id); // Parse the mealId to an integer
    try {
        await prisma.meal.delete({ // Delete the meal using Prisma
            where: {
                id: mealId,
            },
        });
        res.sendStatus(204); // Send a 204 No Content response indicating successful deletion
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).send('Error deleting meal');
    }
});

// Export the router
module.exports = router;
