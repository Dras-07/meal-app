const express = require('express');
const userRoutes = require('./routes/userRoute');
const mealRoutes = require('./routes/mealRoute');
const app = express();
const port = 5000;
const baseUrl = 'https://meal-app-client.vercel.app';
const cors = require('cors');

app.use(cors()); 

app.use(express.json()); 

app.use('/', userRoutes);
app.use('/', mealRoutes);


app.get('/', function(req, res){
    res.sendStatus(201);
})
app.listen(port, () => {

    console.log(`Server is listening on port ${port}`);
});
