// Setup express router
const express = require("express");
const router = express.Router();

// Access to DAO files
const restaurantsDAO = require("../modules/restaurantsDAO.js");
const userDao = require("../modules/users-dao.js");

const path = require("path");
const fs = require("fs");

//Home page load added by Cara
router.get("/", async function(req,res){


    if (req.session.user) {
        res.locals.login = false;
    } else {
        res.locals.login = true;
    }

    res.cookie("city", "Las Vegas");
    let city = req.cookies.city;
    res.locals.restaurants = await userDao.retrieveAllRestaurantsByCity(city);

    res.render("main");
});

router.post("/",  function(req, res) {

    const city = req.body.city;
    res.cookie("city", city);
    res.end("1");
});


module.exports = router;
