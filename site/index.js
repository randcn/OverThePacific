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



// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Setup express-session
const session = require("express-session");
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "CS719"
}));

// Setup our routes
const siteRouter = require("./routes/site-routes.js");
app.use(siteRouter);
const registerRouter = require("./routes/register-routes.js");
app.use(registerRouter);
const loginRouter = require("./routes/login-routes.js");
app.use(loginRouter);
const logoutRouter = require("./routes/logout-routes.js");
app.use(logoutRouter);


//route for restaurant details page
const resdetails = require("./routes/res-details.js");
app.use(resdetails);


//Makes the app listen to port 5000
app.listen(port, () => console.log(`App listening to port ${port}`));
