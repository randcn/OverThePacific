
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
    for (let i=0; i<reviews.length;i++){
        res.locals.reviews[i].date = reviews[i].date.toString().substring(0,24);
    }


    res.render("details");
});

router.post("/insertReview", async function(req, res) {
    let reviewText = "'"+req.body.reviewText+"'";
    let star = req.body.star;
    let business_id = req.body.business_id;
    let user_id = "'" +req.session.user.user_id+"'";
    let result;
    result = await dao.insertReview(user_id, business_id, star, reviewText);

    res.send(result);
});


module.exports = router;
