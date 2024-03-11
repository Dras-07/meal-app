const express = require('express');
const userRoutes = require('./routes/userRoute');
const mealRoutes= require('./routes/mealRoute');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());


// Middleware
app.use(express.json()); // Parse JSON bodies

// Use user routes
app.use('/', userRoutes);
app.use('/',mealRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
