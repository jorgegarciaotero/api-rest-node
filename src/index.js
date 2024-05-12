const { connection } = require('../database/connection');
const express = require('express');
const cors = require('cors');



//settings
const port = 3900;

//Init app
console.log("app working")

//DATABASE CONNECTION
connection();


//CREATE NODE SERVER
const app = express();  //variable where we store express app.
//Config cors
app.use(cors());
//convert body to json
app.use(express.json()); //receives data as content-type app/json
app.use(express.urlencoded({ extended: true })) //


//ROUTES
const routes_article= require('../routes/article'); //defines de route path. Loads all the URL from ../routes/article
app.use('/api', routes_article.router); //middleware function used in Express.js web frameworks to handle incoming form data submitted through the HTTP POST method




//Create server 
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});