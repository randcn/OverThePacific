const database = require("./database.js");
const { v1: uuidv1 } = require('uuid');

async function getResDetails(business_id) {
    const db = await database;
    const name = await db.query( "select * from restaurants where business_id = ?", [business_id]);
    return name;
}

async function getOpenHours(business_id) {
    const db = await database;
    const openHours = await db.query( "select * from business_hours where business_id = ?", [business_id]);
    return openHours;
}


async function getAllReviewsForRes(business_id) {
    const db = await database;
    const reviews = await db.query( "select a.name, a.user_id,b.stars, b.text, b.business_id, b.date from users as a, reviews as b where a.user_id=b.user_id and b.business_id=? ORDER BY b.date DESC",[business_id]);
    return reviews;
}

async function insertReview(review_id, user_id, business_id, stars, text) {
    const db = await database;
    let result;
    console.log("red-details dao: "+review_id);
    console.log("red-details dao: "+user_id + " " + business_id + " " + stars + " "+text);
    review_id = review_id.toString();
    user_id = user_id.toString();
    business_id = business_id.toString();
    result = await db.query( "insert into reviews (review_id, user_id, business_id, stars, text) VALUES (?,?,?, ?, ?)",[review_id],[user_id],[business_id],[stars],[text]);
    return result;
}


async function updateRestaurants(business_id, stars) {
    const db = await database;
    let result;
    let review_count;
    let starsBeforeInsert = await db.query( "select stars from restaurants where business_id= ?",[business_id]);
    review_count = await db.query( "select review_count from restaurants where business_id= ?",[business_id]);
    let newReview_count = parseInt(review_count[0].review_count) +1;
    starsBeforeInsert = starsBeforeInsert[0].stars;
    let addedStars = stars/newReview_count;
    let newStars= parseFloat(starsBeforeInsert) +  parseFloat(addedStars);
    newStars = newStars.toFixed(8);
    newReview_count = newReview_count.toString();
    result = await db.query( "update restaurants set stars = "+newStars+", review_count = "+newReview_count+" where business_id= "+business_id+"");
    return result;
}


module.exports = {
    getAllReviewsForRes,
    getResDetails,
    insertReview,
    updateRestaurants,
    getOpenHours
};