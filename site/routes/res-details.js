
const express = require("express");
const router = express.Router();
// The DAO that handles CRUD operations for users.
const dao = require("../modules/res-detailsDao.js");

router.get("/details", async function (req, res) {

    res.locals.title = "Details";

    //get restaurant name and all comment from DB:
    let reviews;
    let reviewsNum;
    let restaurant;
    restaurant = await dao.getResDetails(1);
    reviews = await dao.getAllReviewsForRes(1);
    reviewsNum = reviews.length;

    res.locals.restaurant = restaurant[0];
    res.locals.reviews = reviews;
    res.locals.reviewsNum = reviewsNum;

    res.render("details");
});

module.exports = router;
