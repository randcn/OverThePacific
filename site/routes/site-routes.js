// Setup express router
const express = require("express");
const router = express.Router();

// Access to DAO files
const restaurantsDAO = require("../modules/restaurantsDAO.js");

const path = require("path");
const fs = require("fs");


// Route handlers

//Home page load added by Cara
router.get("/", async function(req,res){
    // Get all restaurants
    const restaurants = await restaurantsDAO.getAllRestaurants();
    //console.log(restaurants)
    res.locals.restaurants = restaurants;

    for (let i=0; i<restaurants.length; i++) {
        res.locals.restaurants[i].stars = restaurants[i].stars.toString().substring(0,3);
    }

    res.render("main");
});


module.exports = router;