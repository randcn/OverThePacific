// Setup express router
const express = require("express");
const router = express.Router();

// Access to DAO files
const restaurantsDAO = require("../modules/restaurantsDAO.js");

const path = require("path");
const fs = require("fs");

var current_query = "";

const sort_map = {
    "Name, Asc" : ["name", ""],
    "Name, Desc" : ["name", "desc"],
    "Rating, Asc" : ["stars", ""],
    "Rating, Desc" : ["stars", "desc"]
}

// Route handlers

//Home page load added by Cara
router.get("/", async function(req, res){
    // Get all restaurants
    const restaurants = await restaurantsDAO.getAllRestaurants();
    //console.log(restaurants)
    res.locals.restaurants = restaurants;
    
    res.render("main");
});


// Search and sort functionality
router.post("/", async function (req, res) {
    const query = req.body.search
    const sort_option = req.body.sort_by
    var restaurants
    if (sort_option){
        console.log(sort_option)
        console.log(typeof sort_option)

        restaurants = await restaurantsDAO.getSortedSearchedRestaurants(current_query, 
            sort_map[sort_option][0], 
            sort_map[sort_option][1])
    }
    if (query){
        current_query = query
        restaurants = await restaurantsDAO.getSearchedRestaurants(query);
    }

    res.locals.restaurants = restaurants;
    
    res.render("main");
});




module.exports = router;