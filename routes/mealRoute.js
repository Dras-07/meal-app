const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://wnabcnsdmnxybzgpggqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYWJjbnNkbW54eWJ6Z3BnZ3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTg2OTgsImV4cCI6MjAyNTM5NDY5OH0.f4wSlaCmIH-Ld0SlV4ibUcCPIPt_6dPG5uv5c2RD_a4'; // Use the appropriate API key here
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();
const isAuthenticated = require('../isAuthenticated'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});



router.get('/meals/:day/:userId',  async (req, res) => {
    const day = req.params.day; 
    const userId= req.params.userId; 
   
    try {
        const meals = await prisma.meal.findMany({ 
            where: {
                day: day,
                userId: userId,
            },
            include: {
                ingredients: true, 
            },
        });
        res.json(meals); 
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).send('Error fetching meals');
    }
});



router.post('/meals', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { data: user, error } = await supabase.auth.getUser(token.replace('Bearer ', ''));

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid session token' });
        }
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

        res.status(201).json(meal);
    } catch (error) {
        console.error('Error creating meal:', error);
        res.status(500).send('Error creating meal');
    }
});


router.put('/meals/:id', async (req, res) => {
    const mealId = parseInt(req.params.id); 
    const { name, description, imageUrl, ingredients } = req.body;
    try {
        const updatedMeal = await prisma.meal.update({ 
            where: {
                id: mealId,
            },
            data: {
                name,
                description,
                imageUrl,
                ingredients: { 
                    deleteMany: {}, 
                    create: ingredients.map(ingredient => ({
                        name: ingredient.name,
                    })),
                },
            },
            include: {
                ingredients: true, 
            },
        });
        res.json(updatedMeal); 
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).send('Error updating meal');
    }
});

router.delete('/meals/:id', async (req, res) => {
    const mealId = parseInt(req.params.id);
    try {
        await prisma.meal.delete({
            where: {
                id: mealId,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).send('Error deleting meal');
    }
});

module.exports = router;
