const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const { PORT } = process.env;

const recipeRoutes = require('./routes/Reciperoutes');

app.use(cors())
app.use(express.json());
app.use(express.static('public'));


app.use('/recipes', recipeRoutes);



app.listen(PORT, () => {
    console.log(`app running on port: ${PORT}`);
});