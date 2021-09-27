// Setup express router
const express = require("express");
const router = express.Router();

// Access to DAO files
const restaurantsDAO = require("../modules/restaurantsDAO.js");
const userDao = require("../modules/users-dao.js");

const path = require("path");
const fs = require("fs");


// get city
router.get("/", async function(req,res){


    if (req.session.user) {
        res.locals.login = false;
    } else {
        res.locals.login = true;
    }

    let city = "Las Vegas";
    if (req.cookies.city !== undefined) {
        city = req.cookies.city;

    }

    res.locals.selectedCity = city;
    let restaurants = await userDao.retrieveAllRestaurantsByCity(city);
    res.locals.restaurants = restaurants;
    console.log(restaurants[0]);
    for (let i=0; i<restaurants.length; i++) {
        res.locals.restaurants[i].stars = restaurants[i].stars.toString().substring(0,3);
    }

    res.render("main");
});

router.post("/city",  function(req, res) {

    const city = req.body.city;
    // console.log(city);
    res.cookie("city", city);
    res.end(city);
});


var current_query = "";

const sort_map = {
    "Name, Asc" : ["name", ""],
    "Name, Desc" : ["name", "desc"],
    "Rating, Asc" : ["stars", ""],
    "Rating, Desc" : ["stars", "desc"]
}


// Search and sort functionality
router.post("/", async function (req, res) {
    const city = req.cookies.city;
    console.log(city);
    const query = req.body.search
    const sort_option = req.body.sort_by
    var restaurants
    if (sort_option){
        console.log(sort_option)
        console.log(typeof sort_option)

        restaurants = await restaurantsDAO.getSortedSearchedRestaurants(city, current_query,
            sort_map[sort_option][0],
            sort_map[sort_option][1])
    }
    if (query){
        current_query = query
        restaurants = await restaurantsDAO.getSearchedRestaurants(city, query);
    }

    res.locals.restaurants = restaurants;


    res.render("main");
});




module.exports = router;
