
const express = require("express");
const router = express.Router();
// The DAO that handles CRUD operations for users.
const dao = require("../modules/res-detailsDao.js");
const {v1: uuidv1} = require("uuid");

router.get("/details", async function (req, res) {
    res.locals.title = "Details";
    res.locals.business_id = req.query.restaurant;
    if (req.session.user) {
        res.locals.login = false;
        res.locals.loggedIn= true;
        res.locals.disableReview= false;
    }else {
        res.locals.login = true;
        res.locals.disableReview = true;
    }
    if(res.locals.business_id==undefined){
        res.redirect("/");
    }

    //get restaurant name and all comment from DB:
    let reviews;
    let restaurant;
    let openHours;

    restaurant = await dao.getResDetails(res.locals.business_id);
    reviews = await dao.getAllReviewsForRes(res.locals.business_id);
    openHours = await dao.getOpenHours(res.locals.business_id);

    res.locals.restaurant = restaurant[0];
    res.locals.reviews = reviews;
    res.locals.starsDisplay = restaurant[0].stars.toString().substring(0,3)
    res.locals.openHours = openHours[0];
    for (let i=0; i<reviews.length;i++){
        res.locals.reviews[i].date = reviews[i].date.toString().substring(0,24);
        if (res.locals.reviews[i].text==null) {
            res.locals.reviews[i].text = 'n/a';
        }
    }
    let latitude= restaurant[0].latitude.toString();
    let longitude= restaurant[0].longitude.toString();
    res.locals.restaurant.latitude=latitude.substring(0,latitude.indexOf(".")+8);
    res.locals.restaurant.longitude=longitude.substring(0,longitude.indexOf(".")+8);


    res.render("details");
});

router.post("/insertReview", async function(req, res) {

    let reviewText = "'"+req.body.reviewText+"'";
    let starRate = req.body.starRate;
    let business_id = req.body.business_id;
    //let user_id = "'" +req.session.user.user_id+"'";
    let user_id = req.session.user.user_id;
    let result;
    const review_id = uuidv1();

    await dao.insertReview(review_id, user_id, business_id, starRate, reviewText);
    result = await dao.updateRestaurants(business_id, starRate);

    res.send(result);
});


module.exports = router;
