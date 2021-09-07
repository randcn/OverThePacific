//Loads the express module
const express = require('express');
//Creates our express server
const app = express();
const port = 5000;

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({defaultLayout: "index"}));

// Setup multer (files will temporarily be saved in the "temp" folder).
const path = require("path");

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname,"public")));

// ckeditor config
app.use(express.static(path.join(__dirname,"build")));


// Setup our routes
const siteRouter = require("./routes/site-routes.js");
app.use(siteRouter);


//Makes the app listen to port 5000
app.listen(port, () => console.log(`App listening to port ${port}`));