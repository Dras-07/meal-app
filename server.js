const express = require('express');
const userRoutes = require('./routes/userRoute');
const mealRoutes = require('./routes/mealRoute');
const app = express();
const port = 5000;
const baseUrl = 'https://meal-app-client.vercel.app';
const cors = require('cors');

app.use(cors({ origin: 'https://meal-app-client.vercel.app' })); // Allow requests from meal-app-client.vercel.app

// Middleware
app.use(express.json()); // Parse JSON bodies

// Use user routes
app.use('/', userRoutes);
app.use('/', mealRoutes);


app.get('/', function(req, res){
    res.sendStatus(201);
})
// Start the server
app.listen(port, () => {

    console.log(`Server is listening on port ${port}`);
});
