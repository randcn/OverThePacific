
const express = require("express");
const router = express.Router();
// The DAO that handles CRUD operations for users.
const dao = require("../modules/res-detailsDao.js");

router.get("/details", async function (req, res) {
    res.locals.title = "Details";
    res.locals.business_id = req.query.restaurant;
    if (req.session.user) {
        res.locals.loggedIn= true;
        res.locals.disableReview= false;
    }else {
        res.locals.disableReview = true;
    }
    if(res.locals.business_id==undefined){
        res.redirect("/");
    }

    //get restaurant name and all comment from DB:
    let reviews;
    let restaurant;

    restaurant = await dao.getResDetails(res.locals.business_id);
    reviews = await dao.getAllReviewsForRes(res.locals.business_id);

    res.locals.restaurant = restaurant[0];
    res.locals.reviews = reviews;
    res.locals.starsDisplay = restaurant[0].stars.toString().substring(0,3)
    for (let i=0; i<reviews.length;i++){
        res.locals.reviews[i].date = reviews[i].date.toString().substring(0,24);
    }


    res.render("details");
});

router.post("/insertReview", async function(req, res) {

    let reviewText = "'"+req.body.reviewText+"'";
    let starRate = req.body.starRate;
    let business_id = req.body.business_id;
    let user_id = "'" +req.session.user.user_id+"'";
    let result;
    await dao.insertReview(user_id, business_id, starRate, reviewText);
    result = await dao.updateRestaurants(business_id, starRate);

    res.send(result);
});


module.exports = router;
